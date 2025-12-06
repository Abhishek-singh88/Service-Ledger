// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LocalVouchers is ERC1155, Ownable {
    struct Business {
        bool registered;
        address owner;
        string metadataURI;
    }

    struct VoucherInfo {
        address business;
        uint256 price;
        uint256 expiry;
        bool active;
    }

    IERC20 public immutable paymentToken;
    address public feeRecipient;
    uint256 public feeBps;

    mapping(address => Business) public businesses;
    mapping(uint256 => VoucherInfo) public vouchers;

    uint256 public nextVoucherId;
    mapping(uint256 => string) private _tokenURIs;

    // Events
    event BusinessRegistered(address indexed business, string metadataURI);
    event BusinessMetadataUpdated(address indexed business, string metadataURI);
    event VoucherCreated(
        uint256 indexed tokenId,
        address indexed business,
        uint256 price,
        uint256 expiry,
        string uri
    );
    event VoucherPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 amount,
        uint256 totalPaid,
        uint256 fee
    );
    event VoucherRedeemed(
        uint256 indexed tokenId,
        address indexed user,
        uint256 amount
    );
    event FeeUpdated(uint256 feeBps, address feeRecipient);

    constructor(
        address _paymentToken,
        address _feeRecipient,
        uint256 _feeBps,
        string memory _baseURI
    ) ERC1155(_baseURI) Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid payment token");
        require(_feeRecipient != address(0), "Invalid fee recipient");
        require(_feeBps <= 1_000, "Fee too high");

        paymentToken = IERC20(_paymentToken);
        feeRecipient = _feeRecipient;
        feeBps = _feeBps;
        nextVoucherId = 1;
    }

    // --- Admin ---

    function setFeeConfig(address _feeRecipient, uint256 _feeBps) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        require(_feeBps <= 1_000, "Fee too high");

        feeRecipient = _feeRecipient;
        feeBps = _feeBps;

        emit FeeUpdated(_feeBps, _feeRecipient);
    }

    // --- Business logic ---

    function registerBusiness(string calldata metadataURI) external {
        Business storage b = businesses[msg.sender];
        require(!b.registered, "Already registered");

        b.registered = true;
        b.owner = msg.sender;
        b.metadataURI = metadataURI;

        emit BusinessRegistered(msg.sender, metadataURI);
    }

    function updateBusinessMetadata(string calldata metadataURI) external {
        Business storage b = businesses[msg.sender];
        require(b.registered, "Not registered");
        b.metadataURI = metadataURI;

        emit BusinessMetadataUpdated(msg.sender, metadataURI);
    }

    function createVoucher(
        uint256 price,
        uint256 expiry,
        string calldata uri_
    ) external returns (uint256 tokenId) {
        Business storage b = businesses[msg.sender];
        require(b.registered, "Not a business");
        require(price > 0, "Price must be > 0");

        tokenId = nextVoucherId++;
        vouchers[tokenId] = VoucherInfo({
            business: msg.sender,
            price: price,
            expiry: expiry,
            active: true
        });

        _tokenURIs[tokenId] = uri_;

        emit VoucherCreated(tokenId, msg.sender, price, expiry, uri_);
    }

    function setVoucherActive(uint256 tokenId, bool active) external {
        VoucherInfo storage v = vouchers[tokenId];
        require(v.business != address(0), "Voucher not found");
        require(msg.sender == v.business, "Not voucher owner");

        v.active = active;
    }

    // --- Buying & Redeeming ---

    function buyVoucher(uint256 tokenId, uint256 amount) external {
        require(amount > 0, "Amount = 0");

        VoucherInfo memory v = vouchers[tokenId];
        require(v.business != address(0), "Voucher not found");
        require(v.active, "Voucher inactive");
        if (v.expiry != 0) {
            require(block.timestamp < v.expiry, "Voucher expired");
        }

        uint256 total = v.price * amount;
        uint256 fee = (total * feeBps) / 10_000;
        uint256 businessAmount = total - fee;

        require(
            paymentToken.transferFrom(msg.sender, feeRecipient, fee),
            "Fee transfer failed"
        );
        require(
            paymentToken.transferFrom(msg.sender, v.business, businessAmount),
            "Business transfer failed"
        );

        _mint(msg.sender, tokenId, amount, "");

        emit VoucherPurchased(tokenId, msg.sender, amount, total, fee);
    }

    function redeemSelf(uint256 tokenId, uint256 amount) external {
        require(amount > 0, "Amount = 0");
        VoucherInfo memory v = vouchers[tokenId];
        require(v.business != address(0), "Voucher not found");
        if (v.expiry != 0) {
            require(block.timestamp < v.expiry, "Voucher expired");
        }

        _burn(msg.sender, tokenId, amount);

        emit VoucherRedeemed(tokenId, msg.sender, amount);
    }

    // --- ERC1155 URI override ---

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory specific = _tokenURIs[tokenId];
        if (bytes(specific).length > 0) {
            return specific;
        }
        return super.uri(tokenId);
    }
}
