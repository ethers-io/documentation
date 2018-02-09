
Contracts
*********

A Contract is an program which has been installed at an address, has allocated
memory and is runnning on the Ethereum blockchain, with methods that can read and
update the the allocated memory.

At a low-level, this contract is running in a language similar to Java bytecode or
assembly language in the Ethereum Virtual Machine (EVM).

The `Contract API`_ simplifies interacting with a Contract by exposing it as a normal
JavaScript object as specified by the Contract ABI.

-----

What is the Application Binary Interface (ABI)
==============================================

Each Contract has an Application Binary Interface (ABI), which is a simple JSON
description, which includes:

- all function names
- all function input parameters (and types)
- for each function, the output object properties (and types)
- all event names
- for each event, the parameters that are available when emitted

-----

Where do I get the ABI?
-----------------------

If you are using a contract provided by someone else, they will include the ABI
for you to use.

There are also many services which allow Contract developers to share their source
and ABI, for example a `hard-fork splitter contract on Etherscan`_.

If you compile your own contract, the ABI is generated for you by the compiler::

    // Using Solidity

    // The compiler
    var solc = requrie('solc');

    // Contract source code
    var source = "contract TestContract { }";

    // The compiled result
    var compiled = solc.compile(source);

    // The ABI
    var abi = compiled.contracts.TestContract.interface.


.. _Solidity: https://solidity.readthedocs.io
.. _hard-fork splitter contract on Etherscan: https://etherscan.io/address/0x3474627d4f63a678266bc17171d87f8570936622#code

-----

.. _api-contract:

Contract API
============

The **Contract API** connects to a Contract on the blockchain to provide a JavaScript
interface which handles converting values between the EVM binary format and JavaScript
for calling functions and watching for events.

-----

Connecting to a Contract
------------------------

:sup:`ethers` . getContract ( contractAddressOrName , contractInterface )
    Returns a new connection to a contract at *contractAddressOrName* with the
    *contractInterface*.


Prototype
---------

The prototype of the Contract will automatically be populated with the functions
and events specified in the ABI.

The result of all constant methods are a Promise which resolve to the result as
a tuple, optionally with the parameters accessible by name, if named in the ABI.

The result of all non-constant methods are a Promise which resolve to the transaction
that was sent to the network.

Name collisions with the built-in properties (below) will not be overwritten.
Instead, they must be accessed through the functions or events property.

Due to signature overloading, multiple functions can have the same name. The
JavaScript type system cannot determine these, so only the first function with
a given name will be available. (In the future this will be addressed by
adding parameter explicit calls).

:sup:`prototype` . address
    The address of the contract.

:sup:`prototype` . interface
    The Interface meta-class of the parsed ABI. Generally, this should not
    need to be accessed directly.

:sup:`prototype` . functions . *functionName*
    An object that maps each ABI function name to a function that will either
    call (for contant functions) or request the user to sign and send a transaction
    (for non-constant functions)

:sup:`prototype` . estimate . *functionName*
    An object that maps each ABI function name to a function that will estimate the
    cost the provided parameters.

:sup:`prototype` . events . on\ *eventname*
    An object that maps each ABI event name (lower case, with the "on" prefix) to a
    callback that is triggered when the event occurs.

    
**Example**

::

    // This example is the Zen Messenger on mainnet
    // See: https://etherscan.io/address/0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64#code
    
    var contractAddress = "0x954De93D9f1Cd1e2e3AE5964F614CDcc821Fac64";
    var contractAbi = [
        {
            constant: true,
            inputs: [],
            name: "getValue",
            outputs: [
                {
                    name: "value",
                    type: "string"
                }
            ],
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    name: "value",
                    type: "string"
                }
            ],
            name: "setValue",
            outputs: [],
            type: "function"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    name: "oldValue",
                    type: "string"
                },
                {
                    indexed: false,
                    name: "newValue",
                    type: "string"
                }
            ],
            name: "valueChanged",
            type: "event"
        }
    ];
  
    
    // Connect to the contract
    var contract = ethers.getContract(contractAddress, contractInterface);


-----


Read-Only Functions (free)
--------------------------

Any methods of the contract which are marked as **constant** do not modify the
blockchain, and are free to call. These methods will return a Promise which
resolves to a result with the positional parameters specified in the ABI, and
optionally accessible by named values (if specified in the ABI).

**Example**

::

     // See contract from "Connecting to a Contract" above

     var getValuePromise = contract.getValue();

     getValuePromise.then(function(result) {
         console.log("Result (positional parameter; 0)", result[0]);
         console.log("Result (property parameter; 0)", result.value);
         // "Hello World"
     });

-----

Update Functions (costs ether; prompts user to accept)
------------------------------------------------------

Any attempt to call a method which is not constant will prompt the user to accept
the transaction requried to call the function to update the Contract.

The returned Promise will resolve to the transaction if the transaction was accepted
or rejects an Error with the message 'cancelled'.

**Example**

::

    var setValuePromise = contract.setValue('Duck Duck Goose');

    setValuePromise.then(function(transaction) {
        // The transaction has been delivered to the network (but not mined)
        console.log('Success!');
        console.log(transaction);

        // Optionally detect when the transaction has been mined
        var waitPromise = ethers.blockchain.waitForTransaction(transaction.hash);

        waitPromise.then(function(transaction) {
            console.log('Transaction confirmed in block: ' + transactin.blockNumber);
        });

    }).catch(function(error) {
        if (error.message === 'cancelled') {
            console.log('Transaction was declined by the user');
        } else {
            console.log('Unknown Error');
            console.log(error);
        }
    });

----

Events
======

Events can be emitted by transactions (which cost ether) but listened to for free.

When an event is called, it will trigger any function assigned to the event handler
on the contract.

The event handler is the name of the event, all lower-case with the prefix **on**,
so the "valueChanged" event in the above contract becomes, "onvaluechanged".

**Example**

::

    contract.onvaluechanged = function(oldValue, newValue) {
        console.log('Value Changed:');
        console.log('  oldValue: ' + oldValue);
        console.log('  newValue: ' + newValue);
    };
    
-----

.. _Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

