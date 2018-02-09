.. _tutorial-token:

Creating a Token
****************

If you have not already, please make sure you have the :ref:`required software <tutorial-req-software>`.

We deal with tokens all the time in our day-to-day life, such as:

- coins (or money in general)
- shares on a stock market
- credit card rewards points
- voter registrations

In each case we want a **thing** (think: **token**) which:

- cannot be copied or counterfeitted
- has specific rules governing transferring ownership (of possibly forbidding transfer)
- only the legitimate owner has access to use

Which are properties a blockchain-based system, like Ethereum, provides.


-----


Creating Your First Application
===============================

**1. Download and Unzip the Demo Project**

    Download the `demo project <https://cdn.ethers.io/tutorials/token-demo.zip>`_ and unzip it onto your computer, then navigate to that folder inside a terminal.

**2. Try It Out, Run Your Application Locally on the Testnet**

    The ethers-build toolchain includes the standard **Ethers container** and can serve it locally as a normal webserver with your app embedded inside it.
    ::

    /Users/ethers/my-app> ethers-build serve --testnet

**3. Browse the Application**

    Now in your browser, navigate to `the local running ethers.io container. <http://localhost:8080/_/#!/app-link-insecure/localhost:8080/>`_

    Play around with it a bit, to get an idea of how it works.

-----

Exploring
=======================

Here are the list of files downloaded from the demo project.

    * **FreeTestToken.sol** - The smart contract that manages our token
    * **deploy-token.js** - The deployment script; it compiles the contract source (FreeTestToken.sol) and deploys it (with no arguments). More complex contracts may require more complex deployment scripts
    * **test-token.js** - The tests for the FreeTestToken contract
    * **index.html** - The frontend HTML application
    * **package.json** - This is a standard NPM project, so we manage dependencies and scripts using the NPM tools
    * **ethers-app-v0.3.js** - Framework library; you shouldn't need to change this
    * **dashboard-v0.2.*** - Demo Framework library; you shouldn't need to change this
 
-----

Lets Give the Test Cases a Try
===============================

Install all the node modules needed by the tests:

::

/Users/ethers/my-app> npm install

Run the tests:

::

/Users/ethers/my-app> npm test

This is the quickest and easiest way to change and add functionality to a
smart contract. As you modify the smart contract, update and add test cases
to ``test-token.js`` and then run ``npm test``. This creates a virtual
blockchain in memory and runs your testcases against it.

Lets add some debugging to the FreeTestToken contract. Update the mint function
to the following:

.. code-block:: java

    function mint() returns (bool success) {
        //! "Minting"
        //! msg.sender
        _balances[msg.sender] += 1;
        _totalSupply += 1;
        return true;
    }

And run `npm test` again. You should see some additional lines in the output:

::

//! Debug(line = 23, type = string):  Minting
//! Debug(line = 24, type = address):  0xe26C5C346F45753C78c6B47e548313B0bd050B9A

The test cases will automatically use a compiler which has been modified to inject debug statements into your contract. When compiled for deployment, since these are only in comments, they will be ignored.


-----

Try Out Deployment
=====================

Ethers provides a hosting service **ethers.space**, which allows small (under 5MB) applications to be deployed and hosted using the ethers-build toolchain.

**1. Create a Git Repository and Add the Project Files**

The ethers-build toolchain requires a git repository for managing hosted applications. This enables meaningful diffs against what is published, what is local and the contents of prepared Slugs.

::

    /Users/ethers/my-app> git init
    Initialized empty Git repository in /Users/ethers/my-app/.git/
    
    /Users/ethers/my-app> git add *.html *.js *.css
    
    /Users/ethers/my-app> git commit -m 'Initial code drop.'


**2. Setup an ethers.space Account**

The hosting provided by Ethers does not require any sign-up or usernames. Instead it is managed by a standard Ethereum account which signs data for uploading. Your application will be located a *address.ethers.space*. Applications sizes must be 5MB or less.

::

    # This command will require a password and will generate ./account.json
    /Users/ethers/my-app> ethers-build init
    Do NOT lose or forget this password. It cannot be reset.
    New Account Password: ******
    Confirm Password: ******
    Encrypting Account... (this may take a few seconds)
    Account successfully created. Keep this file SAFE. Do NOT check it into source control


**3. Prepare Your Application**

For deploying to **ethers.space**, your application is bundled into a single Slug file, which will be signed when uploaded (or optionally signed earlier for deferred deployments).

::

    # This command bundles up your application (tracked by git) into a Slug
    /Users/ethers/my-app> ethers-build prepare
    Adding:
        dashboard-v0.2.css
        dashboard-v0.2.js
        deploy-token.js
        ethers-app-v0.3.js
        index.html
        test-token.js
    WARNING!
       [ you may ignore these for now ]

**4. Publish Your Application to ethers.space**

::

    /Users/ethers/my-app> ethers-build publish unsigned.slug
    Account Password (./account.json): ******
    Application URLs:
      Testnet: https://testnet.ethers.io/#!/app-link/0xc7cc5c382e60ecc2c33ddaedfcc9601acfa1d3bd.ethers.space
      Mainnet: https://ethers.io/#!/app-link/0xc7cc5c382e60ecc2c33ddaedfcc9601acfa1d3bd.ethers.space
    Successfully deployed!


Your Application is now LIVE on the internet for all to enjoy, on both the Ropsten testnet and the Ethereum mainnet at the URLs in the publish messages.

-----

Modifying the Contract
=====================
**1. Only Allow the Token Owner to Mint New Tokens**

Change the ``mint()`` function to the following:

.. code-block:: java

    function mint() returns (bool success) {
        require(msg.sender == _owner);
        _balances[msg.sender] += 1;
        _totalSupply += 1;
        return true;
    }

**2. Get Some Testnet Ether**

From the `Ethers testnet faucet <https://testnet.ethers.io/#!/app-link/0xa5681b1fbda76e0d4ab646e13460a94fdcd3c1c1.ethers.space/>`_, import your ``/account.json`` by clicking the gear in the lower-right corner.

Once you have funded your account with some testnet ether, you will be able to proceed to deploy
contracts on testnet.

**3. Deploy the New Contract**

::

    /Users/ethers/my-app> ethers-build deploy deploy-token.js --testnet --account account.json --gas-price 100
    Sign Transaction:
        Network:       testnet
        From:          0xC7cc5C382e60ecC2C33dDAEdFcc9601ACFa1d3bD
        Gas Price:     100.0 Gwei
        Gas Limit:     1500000
        Value:         0.0 ether
        Data:          1300 bytes
    Account Password (testnet:account.json): ******
    Deployed: FreeTestToken (./FreeTestToken.sol)
        Transaction Hash: 0x3f6449dcc1fefb55d24d7a3f2e2ca9899f9a61f49c7d2808223348fb75a236ec
        Contract Address: 0x972015EEC839Fe2c1e65374Cee516d68058dEd16
        Bytecode:         0x6060604052341561000f57600080fd5b6104f68061001e6000396000f300606060405236156100a15763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100a6578063095ea7b3146101305780631249c58b1461016657806318160ddd1461017957806323b872dd1461019e578063313ce567146101c65780634e8c2927146101ef57806370a082311461020457806395d89b4114610223578063a9059cbb14610236575b600080fd5b34156100b157600080fd5b6100b9610258565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100f55780820151838201526020016100dd565b50505050905090810190601f1680156101225780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561013b57600080fd5b610152600160a060020a036004351660243561028f565b604051901515815260200160405180910390f35b341561017157600080fd5b6101526102c0565b341561018457600080fd5b61018c6102ec565b60405190815260200160405180910390f35b34156101a957600080fd5b610152600160a060020a03600435811690602435166044356102f2565b34156101d157600080fd5b6101d96103c6565b60405160ff909116815260200160405180910390f35b34156101fa57600080fd5b6102026103cb565b005b341561020f57600080fd5b61018c600160a060020a03600435166103f5565b341561022e57600080fd5b6100b9610410565b341561024157600080fd5b610152600160a060020a0360043516602435610447565b60408051908101604052600f81527f46726565205465737420546f6b656e0000000000000000000000000000000000602082015281565b600160a060020a03338116600090815260026020908152604080832093861683529290522081905560015b92915050565b600160a060020a0333166000908152600160208190526040909120805482019055600380548201905590565b60035490565b600160a060020a0383166000908152600160205260408120548290108061033f5750600160a060020a03808516600090815260026020908152604080832033909416835292905220548290105b806103645750600160a060020a03831660009081526001602052604090205482018290105b15610371575060006103bf565b50600160a060020a0380841660009081526001602081815260408084208054879003905560028252808420338616855282528084208054879003905593861683528190529190208054830190555b9392505050565b600081565b6000805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a0316179055565b600160a060020a031660009081526001602052604090205490565b60408051908101604052600381527f4654540000000000000000000000000000000000000000000000000000000000602082015281565b600160a060020a033316600090815260016020526040812054829010806104885750600160a060020a03831660009081526001602052604090205482018290105b15610495575060006102ba565b50600160a060020a033381166000908152600160205260408082208054859003905591841681529081208054830190556102ba5600a165627a7a72305820cc7edc339980de5f0caad583721aaa317fb9714e31ffb407dacc44532feccff40029
        Arguments:        0x
        Interface:        [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"mint","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"FreeToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    

**4. Update the Application Frontend**

Modify the ``index.html`` where we specify and update the contract address to the new address from the above deployment. (e.g. ``0x972015EEC839Fe2c1e65374Cee516d68058dEd16``)


.. code-block:: javascript

    <script type="text/javascript">
       var address = '0x972015EEC839Fe2c1e65374Cee516d68058dEd16';

**5. Refresh your Application**

If you refresh your application in your web browser, you should now be running the latest contract, in which only the owner account (the ``./account.json``) may mint new tokens.

You may use the Ethers import feature to import the account.json into your browser by clicking the gear in the lower-right hand corner of the ethers.io website.


-----

Exercises
=========

- Remove mint entirely and have the constructor create a fixed total supply, allocated to the owner
