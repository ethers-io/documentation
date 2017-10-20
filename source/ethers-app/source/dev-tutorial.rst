.. _dev-tutorial:

Tutorial
********

This is a quick tutorial, to walk you through the creation process of
a complete Ethereum application.

We will build a simple Ethereum application, **Wuzzup**, which allows anyone to
register a username and store status updats. (See a demo of the `final application`_)

**Software You will need:**

- Git
- NPM

.. _final application: https://testnet.ethers.io/#!/app-link/0xa5681b1fbda76e0d4ab646e13460a94fdcd3c1c1.ethers.space/


Overview
========

The Application will consist of two components:

The Ethereum Contract (written in the Solidity language)::
    which will live on the Ethereum network and run across every computer
    in the world to ensure its integrity.

A web interface (written in HTML, CSS and JavaScript)::
    which will allow users to easily interact with your contract, viewing
    and submitting statuses.


What is Ethereum?
=================

Ethereum is a world-wide distributed system that allows the execution of simple computer
programs and to get consensus on what the correct output of those programs should be, in a
way that is tamper-proof and protected from censorship.


Setup: Create Two Test Accounts
===============================

All accounts on ethers, are kept entirely within your browser and on
your computer. No private information is ever sent to any server.

Create two accounts and name them "userOne" and "userTwo".


**Create an Account:**

1. Go to https://testnet.ethers.io
2. Click the gear in the lower right-hand corner
3. Select "Add New Account"
4. Follow the instructions to create, download and verify the account

**Rename an Account:**

1. Click the gear in the lower right-hand corner
2. Select the account you wish to make active
3. Click the pencil to the right of the active account
4. Edit the account nickname


Setup: Getting Free Testnet Ether
=================================

Once you have created an account, select the "userOne" account and select the
`Testnet Faucet`_ application from the top bar.

Once the application loads, click the button to receive some free testnet ether.

.. _Testnet Faucet: https://testnet.ethers.io/#!/app-link/0xa5681b1fbda76e0d4ab646e13460a94fdcd3c1c1.ethers.space/


The Ethereum Contract
=====================

Here is the complete Ethereum Contract. To follow the thought process for designing
and writing a contract, you can see here.

.. literalinclude:: ./tutorial/WuzzupStatus.sol



The Application HTML, CSS and JavaScript
========================================



Run your application locally::

    /Users/ethers> ethers serve --port 8000
    Generating new self-signed certificate. (.ethers-self-signed.pem)
    Listening on port: 8000
    Open in your browser: https://testnet.ethers.io/#!/app-link/localhost:8000/
    (Please make sure you allow the self-signed certificate, if prompted)


Publishing Your Application
===========================

For this tutorial, we will use the ethers.space hosting provied by ethers.io, however
you may always use any hosting service you wish.

The ethers.space hosting must be used in tandem with git, and will only deploy files
tracked in git.

Begin a new application slug::

    # Create a git repository
    /Users/ethers> mkdir test-application
    /Users/ethers> cd test-application
    /Users/ethers/test-application> git init
    
    # Creating a new account requires you to choose a password; do not lose
    # this, as NOBODY can recover this
    /Users/ethers/test-application> ethers init
    Do NOT lose or forget this password. It cannot be reset.
    New Account Password: ******
    Confirm Password: ******
    Encrypting Account... (this may take a few seconds)
    Account successfully created. Keep this file SAFE. Do NOT check it into source control.
    
    # This created an account.json file, which contains an ecrypted Ethereum account
    # Do NOT check this into your source control, but make sure you keep it somewhere
    # safe; without this file and the password you will be unable to update your
    # application.
    /Users/ethers/test-application> ls
    account.json

Add your application code::

    /Users/ethers/test-application> git add index.html
    /Users/ethers/test-application> git commit -m 'My first application'


Deploy your application slug::

    
    /Users/ethers/test-application> ethers push


Exercises
=========

Here are some additional features you may wish to add to your application:

- Add a way to see multiple messages
- Include the time of a message
- Include the sender of a message


----

Creating an Account
-------------------

.. raw:: html

    <div class="slideshow" data-topic="create-account" data-count="9"></div>


Step #1
    Go to https://testnet.ethers.io

Step #2
    Select *"Create New Account"*

Step #3
    Choose and confirm your password; do **NOT** lose this password, it cannot be reset

Step #4
    Download your encrypted Backup JSON Wallet

Step #5
    Upload your Backup JSON Wallet (to verify you have successfully downloaded it)

----

.. comment
