.. _dev-tutorials:

Tutorials
*********

Here are a few quick tutorials to get you up and running, writing your own Ethereum
applications.

-----

.. _tutorial-req-software:

Required Software
=================

git
    Git is a version management system for source code. It provides your with
    complete history tracking, which makes it easy to undo mistakes and see
    what has changed from one time to another.

    See: `Installing Git <install-git>`_
    
node.js
    Node.js (and npm, which comes with it) is a JavaScript interpreter and package
    management, which many of the Ethers tools are built in and managed by.

    See: `Installing node.js and npm <install-node>`_

ethers-cli
    The Ethers CLI (Command Line Interface) is a package of tools to simplify
    creating, maintaining and deploying your applications on **ethers.space**
    which is a free web hosting platform provided by Ethers.

To install **ethers-cli** using npm::

    /Users/ricmoo> sudo npm install -g ethers-cli

-----

.. _tutorial-req-accounts:

Creating Testnet Accounts
=========================

For the tutorials, create two accounts on testnet, one named **"Admin"**
and one named **"User"**.

.. raw:: html

    <div class="slideshow" data-topic="create-account" data-count="12"></div>


Step #1
    Go to https://testnet.ethers.io.

Step #2
    Select *"Create New Account"*.

Step #3
    Choose and confirm your password; do **NOT** lose this password, it cannot be reset.

Step #4
    Download your encrypted Backup JSON Wallet.

Step #5
    Drag and drop your Backup JSON Wallet (to verify you have successfully downloaded
    it; it is not uploaded to any server).

Step #6
    Click the **Accounts Gear** and select the account.

Step #7
    Click the **Edit Name Icon** (pencil icon) and change the name.

-----

Tutorials
=========

As time goes on, we will add more tutorials here.

Create a Token
--------------

A common example of an Ethereum application, creating a token which you can mint
and award to people.

:ref:`Begin Tutorial <tutorial-token>`

-----

.. _install-node: https://docs.npmjs.com/getting-started/installing-node
.. _install-git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
