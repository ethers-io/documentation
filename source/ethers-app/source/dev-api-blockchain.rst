Blockchain
**********

For the most part, you will likely interact with the blockchain using the
:ref:`Contracts API <api-contract>` instead of this low-level API. But there may be rare
instanced where you wish to query the blockchain directly.

-----

Accounts
========

:sup:`ethers.blockchain` . getBalance ( address [ , blockTag ] )
    Returns a `Promise`_ with the balance of *address* (in wei) at
    *blockTag*. An address may represent either an account or a
    contract.

    **default:** *blockTag*\ =latest

:sup:`ethers.blockchain` . getTransactionCount ( address [ , blockNumber ] )
    Returns a `Promise`_ with the number of transactions *address* has
    ever sent at *blockTag*. This is the value required for the **nonce**
    in a transaction; both the `Contracts API`_ and `Wallet API`_ 
    automatically populate this.

    **default:** *blockTag*\ =latest
    
*Examples*
----------

**Balance** ::

    var address = '....';

    var balancePromise = ethers.blockchain.getBalance(address, 'latest');
    balancePromise.then(function(balance) {

        // The balance is in wei, as a BigNumber object

        // Convert wei to a string in ether
        var etherString = ethers.utils.formatEther(balance);

        console.log('Balance: ' + etherString);
    });

**Transaction Count** ::

    var transactionCount = ethers.blockchain.getTransactionCount(address, 'latest');

    transactionCount.then(function(transactionCount) {
        // The transactionCount is a normal JavaScript Number

        console.log('Transactions Sent: ' + transactionCount);
    });


-----

Blockchain State
================

:sup:`ethers.blockchain` . getGasPrice ( )
    Return a `Promise`_ with the current gas price, in wei.

:sup:`ethers.blockchain` . getBlockNumber ( )
    Return a `Promise`_ with the number of the most recent block.

:sup:`ethers.blockchain` . getBlock ( blockhashOrNumber )
    Return a `Promise`_ with the block details of *blockhashOrNumber*.

:sup:`ethers.blockchain` . getTransaction ( transactionHash )
    Return a `Promise`_ with the transaction details of *transactionHash*.

:sup:`ethers.blockchain` . getTransactionReceipt ( hash )
    Return a `Promise`_ with the transaction receipt of *hash*. A
    transaction receipt includes information about a mined transaction,
    such as actualy gas costs.

*Examples*
----------

::

    @TODO
    
-----

Running Code
============

:sup:`ethers.blockchain` . call ( transaction ):
    Returns a `Promise`_ with the result of executing the read-only
    (constant) *transaction*.

:sup:`ethers.blockchain` . estimateGas ( transaction ):
    Returns a `Promise`_ with the estimated cost of executing *transaction*.
    This may be useful if you wish to override the gasLimit when calling
    ethers.sendTransaction().


*Examples*
----------

**Calling read-only (constant) Functions** ::

    var transaction = {

        // This is the address of Zen Messenger on Testnet
        to: "",

        // This is the name of the compiled function
        data: "",
    }

    var callPromise = ethers.blockchain.call(transaction);

    callPromise.then(function(result) {
        console.log(result);
        // 0x....
        // This is the length-prefixed, UTF-8 encoded string of "Hello World"
    });

-----

Events
======

:sup:`ethers.blockchain` . onblock
    This event callback is triggered everytime a new block has been mined.

*Examples*
----------

::

    ethers.blockchain.onblock = function(blockNumber) {
        console.log('New Block Mined: ' + blockNumber);
    }


-----

.. _Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

