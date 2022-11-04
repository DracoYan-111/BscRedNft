import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solpp";


const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.1",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    solpp: {
        //noFlatten: false
    }
};

export default config;
