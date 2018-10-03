Providers
*********

The Ethereum eco-system provides many methods of interacting with the
blockchain. In ethers.js we expose a Provider API that covers the
breadth of operations, however often it is useful to inter-operate with
other existing APIs and libraries.

-----

MetaMask
========

The MetaMask plug-in enables Ethereum for the Chrome browser, making it
easy for people new ecosystem to get started, exposing the Ethereum
network as a standard Web3 Provider.

.. code-block:: javascript
    :caption: *Connecting to MetaMask*

    // MetaMask injects a Web3 Provider as "web3.currentProvider", so
    // we can wrap it up in the ethers.js Web3Provider, which wraps a
    // Web3 Provider and exposes the ethers.js Provider API.

    const provider = new ethers.providers.Web3Provider(web3.currentProvider);

-----

TestRPC / Ganache
=================

The Ganache (formerly TestRPC) is a mock-blockchain which helps create
temporary instances of an Ethereum node for testing.

**NOTE:**
    Ganache is not entirely standards-compliant and may
    not always behave properly. If you are getting deeper
    into Ethereum development, we recommend installing
    Geth or Parity and using a development chain



.. code-block:: javascript
    :caption: *Connecting to a Ganache Node*

    // Once a Ganache node is running, it behaves very similar to a
    // JSON-RPC API node.

    const url = "http://localhost:8545";

    // Or if you are running the UI version, use this instead:
    // const url = "http://localhost:7545"

    const provider = new ethers.providers.JsonRpcProvider(url);

.. code-block:: javascript
    :caption: *Using an In-Process Ganache Instance*

    // If you would like to run an in-process instance of Ganache, you can
    // use a method similar to the MetaMask solution; we wrap the Web3 Provider
    // API with an ethers.js Web3Provider, which exposes the ethers.js API
    // from a Web3 Provider

    const ganache = Ganache.provider(ganacheOptions);
    const provider = new ethers.providers.Web3Provider(ganache);

-----

.. EOF
