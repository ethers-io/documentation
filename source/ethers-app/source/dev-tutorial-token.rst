.. _tutorial-token:

Creating a Token
****************

If you have not already, please make sure you have the :ref:`required software <tutorial-req-software>`
and have :ref:`created two testnet accounts <tutorial-req-accounts>`.

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

Overview
========

The Ethereum network is a peer-to-peer system which runs programs called **contracts**.
Once a contract is **deployed**, it is **running**; it has a memory location (called the
**address**) and has live memory allocated (called **storage**), its code and state are
available to every computer in the entire network and anyone can call any function
on the running contract, which can read and possibly update the **storage**.

There are two types of function calls:

.. _call:

Calls
    These are read-only (also called **constant**). They do not update any state
    in an application, and only need to be run on a single node in the entire
    network to provide you the correct return value. They are **free**.

.. _transaction:

Transactions
    These can change the state of the program by updating the **storage**. These
    need to be executed on **every** node in the entire network. A transaction
    is not **finalized** until a special type of node (called a miner) **mines** it into
    a block, which takes on average about 15 seconds. To cover costs of the miner,
    there is a small fee, paid in **ether**. Transactions **cannot** provide a return
    value.

*If you already have some concerns:*

If anyone can call my contract's functions, how do I keep my state safe?
    Inside the function, you can put conditions, such as ``if (onlyAllowMe()) { ... }``
    or ``if (callerPaidMoney()) { ... }``. Like a real world contract, a
    program is a set of rules which MUST be followed, and we can make up
    any rules we wish to protect our functions however we need.

I need to get a return value from functions with side-effects.
    In these cases, you can wait for the state change to fully take effect
    (which you can detect) and then read the values using constant **calls**.
    Another advanced technique we will explore later allow you to create
    and get notified by events (for example, when a certain value in **storage**
    changed).

Paying ether sounds expensive!
    For now we will be using testnet ether, which is free and useful for testing.
    In production, you will keep contract data small and state-changes minimal,
    so usage remains cheap. Keep in mind, even on traditional services, you pay
    monthly for servers, replication and back-ups, which you don't need on Etehreum.
    

-----

Creating Your First Application
===============================

Create a new directory for your application::

    /Users/ricmoo> mkdir my-app
    /Users/ricmoo> cd my-app
    /Users/ricmoo/my-app>

All Ethers projects are managed through a **git** repository, so we will create one::

    /User/ricmoo/my-app> git init
    Initialized empty Git repository in /Users/ricmoo/my-app/.git/

Create a new account to use with **ethers.space**, this will create a file **account.json**::
    
    /User/ricmoo/my-app> ethers init
    Do NOT lose or forget this password. It cannot be reset.
    New Account Password: ******
    Confirm Password: ******
    Encrypting Account... (this may take a few seconds)
    Account successfully created. Keep this file SAFE. Do NOT check it into source control.

Create your application's start page (index.html) using the default Ethers template::

    /User/ricmoo/my-app> ethers dump-template > index.html

To get an idea of what is going on at this point::

    /Users/ricmoo/my-app> ls -a
    .
    ..
    .git/
    account.json
    index.html

Start your application locally::

    /User/ricmoo/my-app> ethers serve --testnet
    Serving content from file:///Users/ricmoo/my-app
    Listening on port: 8080
    Server Ethers app: http://localhost:8080/_/#!/app-link-insecure/localhost:8080/

Now in your browser, open http://localhost:8080/_/#!/app-link-insecure/localhost:8080/.

This is a very basic application, and it does not do much of anything yet.

-----

Importing Test Accounts
=======================

To start playing with our application, we need some accounts.

Import the accounts you :ref:`created earlier on testnet.ethers.io <tutorial-req-accounts>`.

@TODO: Create a slideshow to show: Import

Step #1
    Click the **Settings Gear** and select **Import JSON Wallet**.

Step #2
    Drag and drop the file onto the web application.

Step #3
    Confirm your password.        

-----

Testnet Ether Faucet
====================

Transaction on the Ethereum network cost ether, which costs real money.

Fortunately, on testnet, ether is **free**, so we can use it for testing without
having to waste real funds.

The Testnet Ether Faucet is a simple application we wrote using the same system
you are learning now. There is nothing special about it.

To get some free testnet ether::

@TODO: Create a slideshow to show: Testnet Faucet App

Step #1
    Click the **Testnet Faucet App** (looks like a water faucet).

Step #2
    Click the **Send Ether** button that appears in the application.

Step #3
    Repeat for both accounts.

-----

Load the Solidity IDE
=====================

The language we write **contracts** in is called **Solidity**.

The Solidity IDE is also, *just another Ethers application*. There is nothing
special about it, and if you don't like a part of it, you can copy it and
build your own using the lessons you learn in this tutorial.

@TODO: Create a slideshow to show: Solidity App

Step #1
    Click the **Solidity App** (looks like a certificate ribbon).

Step #2
    Create a **new Contract**.

**IMPORTANT:**
    There seems to be a bug/problem where source code contracts are periodically
    flushed. Please keep copies of your solidity contracts stored somewhere safe.


-----

Contract
========

Our contract will be a very simple token. When it is deployed to Ethereum, the
creator will receive 1 million tokens, which is the entire supply that will ever
exist.

Tokens can then be transfered to other people, and anyone can query the balance
of anyone else.

*Source Code* ::

    contract SimpleToken {

        // A mapping is like a hash table or associative array.
        // In this case, the keys are Ethereum addresses and the
        // values are that user's balance.
        mapping (address => uint) _balances;

        // The constructor
        function SimpleToken() {

            // The special variable msg.sender is the address of the
            // uer calling a function
            _balances[msg.sender] = 1000000;
        }

        function transfer(address toAddress, uint amount) returns (bool success) {
            if (_balances[msg.sender] < amount) { return false; }

            _balances[msg.sender] -= amount;
            _balances[toAddress] += amount;

            return true;
        }

        function balanceOf(address owner) constant returns (uint balance) {
            return _balances[owner];
        }
    }

-----

Deploying
=========

To deploy a contract onto the Ethereum network, you make a special type of `transaction`_
by using the contracts constuctor.

Step #1
    Copy the Solidity contract source code

Step #2
    Click the Deploy

Step #3
    Confirm the transaction    

Step #4
    Close the contract source

Step #5
    Note the address of your contract. This is the memory address that your
    instance of the contract is running at, which you will need to refer
    to your contract later.

Step #6
    In a new tab, open the GitHub gist for your contract. We will need the
    **Application Binary Interface** in the next step.

-----

Connecting to the Contract
==========================

::

    var address = ... From Step 5 Above ...
    var abi = ... From Step 6 Above ...

    var contract = ethers.getContract(address, abi);
    
    var dashboard = new Dashboard('dashboard');
    var panel;

    panel = dashboard.addPanel('Query Balance');
    panel.addAddressEntry('Address', 'address');
    panel.addButton('Lookup', function(values) {
        var balancePromise = contract.balanceOf(values.address);

        balancePromise.then(function(result) {
            alert('The balance is: ' + result.balance);
        });
    });

    panel = dashboard.addPanel('Transfer');
    panel.addAddressEntry('To Address', 'address');
    panel.addTextEntry('Amount', 'amount');
    panel.addButton('Transfer', function(values) {
        var transferPromise = contract.transfer(values.address, values.amount);
        
        transferPromise.then(function(transaction) {
            console.log(transfer);
            if (transaction) {
                alert('Transaction sent!');
            } else {
                alert('Transaction cancelled!');
            }
        });
    });

Now refresh your application in your browser.

You should be able to move tokens back and forth between accounts.

-----

Exercises
=========

- Add an option to mint new tokens
- Place caps on how many tokens a single account may have
- @TODO: Add more here, along with example solutions
