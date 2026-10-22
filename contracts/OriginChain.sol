
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OriginChain {

    struct Product {
        string id;
        string name;
        string brand;
        string manufacturer;
        string stage;
        bool exists;
    }

    mapping(string => Product) public products;
    mapping(string => string[]) private productHistory;

    event ProductRegistered(string id, string name);
    event StageUpdated(string id, string stage);

    // Register a new product
    function registerProduct(
        string memory _id,
        string memory _name,
        string memory _brand,
        string memory _manufacturer
    ) public {
        require(bytes(_id).length > 0, "Product ID is required");
        require(!products[_id].exists, "Product already registered");

        products[_id] = Product({
            id: _id,
            name: _name,
            brand: _brand,
            manufacturer: _manufacturer,
            stage: "Manufacturer",
            exists: true
        });

        productHistory[_id].push("Manufacturer");

        emit ProductRegistered(_id, _name);
    }

    // Update product journey
    function updateStage(
        string memory _id,
        string memory _newStage
    ) public {
        require(products[_id].exists, "Product not found");

        bytes32 newStageHash = keccak256(bytes(_newStage));

        require(
            newStageHash == keccak256(bytes("Distributor")) ||
            newStageHash == keccak256(bytes("Retailer")),
            "Invalid stage"
        );

        bytes32 currentStageHash =
            keccak256(bytes(products[_id].stage));

        require(
            (currentStageHash == keccak256(bytes("Manufacturer")) &&
             newStageHash == keccak256(bytes("Distributor"))) ||
            (currentStageHash == keccak256(bytes("Distributor")) &&
             newStageHash == keccak256(bytes("Retailer"))),
            "Invalid journey order"
        );

        products[_id].stage = _newStage;
        productHistory[_id].push(_newStage);

        emit StageUpdated(_id, _newStage);
    }

    // Get product details
    function getProduct(
        string memory _id
    ) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        bool
    ) {
        require(products[_id].exists, "Product not found");

        Product memory p = products[_id];

        return (
            p.name,
            p.brand,
            p.manufacturer,
            p.stage,
            p.exists
        );
    }

    // Get complete journey
    function getProductHistory(
        string memory _id
    ) public view returns (string[] memory) {
        require(products[_id].exists, "Product not found");

        return productHistory[_id];
    }
}
