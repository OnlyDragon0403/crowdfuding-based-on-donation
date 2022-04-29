const Crowdsale = artifacts.require('./Main.sol');

module.exports = (deployer) => {
    // deployer.deploy(ConstantLib);
    // deployer.link(ConstantLib,SpaceMatrixLib);
    // deployer.deploy(SpaceMatrixLib);
    // SpaceMatrixLib.address = "413462ed807678828fedaea73b9bbbf8f6a7354802";
    // deployer.link(SpaceMatrixLib, Crowdsale);

    deployer.deploy(Crowdsale);
};


