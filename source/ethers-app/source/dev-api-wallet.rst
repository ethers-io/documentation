Wallet API
**********

This API allows you to query about the current wallet and network status and
request transaction be sent.

-----

Accounts
========

:sup:`ethers` . getAccount ( )
    Returns a `Promise`_ with the address of the currently selected account, or
    **null** if there are no accounts.

*Examples*
----------

::

    var accountPromise = ethers.getAccount();
    
    accountPromise.then(function(address) {
        if (!address) {
            console.log('No accounts.');
        } else {
            console.log('Current Account: ' + address);
        }
    });

-----

Network
=======

:sup:`ethers` . getNetwork ( )
    Returns a Promise_ with the name of the network the wallet it connected to.

    Possible values:

    - **testnet** -- The test network, ether is free and plentiful (ropsten)
    - **mainnet** -- The production Ethereum network (homestead)
    - *custom* -- The JSON-RPC URL of a custom node (only in ethers-cli)

*Examples*
----------

::

    var networkPromise = ethers.getNetwork();

    networkPromise.then(function(network) {
        console.log('Current Network: ' + network);
    });

-----

Transactions
============

Attempting to send a transaction will relinquish control of the application
to the Ethers container, which will then prompt the user to accept or decline
the transaction. If accepted, the container will sign and broadcast the
transaction to the network. The application is then given backcontrol.

:sup:`ethers` . send ( address [ , amountWei ] )
    Prompts the user to confirm sending *amountWei* to *address*.

    Returns a `Promise`_ with the transaction sent to the network by the
    container, or rejects with a **cancelled** error if the transaction was
    declined by the user.

    If *defaultWei* is not specified, the user is required to enter it.

:sup:`ethers` . sendTransaction ( transaction )
    Prompts the user to confirm sending *transaction*. The *gasPrice* and
    *nonce* cannot be overridden.

    Returns a `Promise`_ with the transaction sent to the network by the
    container, or rejects with a **cancelled** error if the transaction was
    declined by the user.
    
    For the most part, this method should not be necessary. The `Contracts API`
    will automatically construct and send transactions with this.

*Examples*
----------

**Sending Ether** ::

    // These are all equivalent
    var amountWei = '0xde0b6b3a7640000';
    var amountWei = new ethers.utils.BN('1000000000000000000'); // 18 zeros
    var amountWei = ethers.parseEther('1.0');

    var address = '0xb2682160c482eB985EC9F3e364eEc0a904C44C23';

    var sendPromise = ethers.send(address, amountWei);

    // When our application regains focus...
    sendPromise.then(function(transaction) {

        // Success! The transaction was sent
        console.log('Transaction Sent!');
        console.log(transaction);

    }, function(error) {

        // Failure; probably cancelled
        console.log('Error: ' + error.message);
    });

**Sending Transactions** ::

    var transaction = {
        to: '...',
        data: '...'
    };

    var sendPromise = ethers.sendTransaction(transaction);

    // When our application regains focus...
    sendPromise.then(function(transaction) {

        // Success! The transaction was sent
        console.log('Transaction Sent!');
        console.log(transaction);

    }, function(error) {

        // Failure; probably cancelled
        console.log('Error: ' + error.message);
    });

-----

Events
======

:sup:`ethers` . onaccount
    This event callback is triggered whenever the active account changes,
    such as when the user explicitly selects a different account or when
    they have created their first account.

*Examples*
----------

::

    ethers.onaccount = function(address) {
        console.log('The user has switched to account: ' + address);
    }

-----

.. _Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

