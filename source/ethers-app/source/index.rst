What is Ethers?
***************

Ethers is an collection of Libraries, Web Tools, Command-Line Utilities and Server
Components to assist in the development, deployment, hosting and sharing of Ethereum
applications.


`Ethers Wallet Container`_ is an Ethereum Wallet and dApp browser which securely
keeps Ethereum private keys stored and managed entirely client-side, while allowing
arbitrary dApps to interact with it from a sandboxed environment. The Ethers Wallet
Container does not require any plug-in, supports all modern browsers and enables
sharing and bookmarking dApps as standard URLs.

The **Ethers App Library** is JavaScript library allows developers to easily add support for
dApps by detecting which Ethereum container is available and setting up both, a
Web3 instance and the Ethers API. Supports any injected Web3 environment (`MetaMask`_,
`Mist`_, `Ethers Wallet`_, `Cipher Browser`_, etc.) the Ethers Wallet Container and if
no signing container is found, will create a read-only connection to the Ethereum network.

The code is open source under the `MIT license`_ and `available on GitHub`_.

.. _Ethers Wallet Container: https://ethers.io/
.. _MIT License: https://en.wikipedia.org/wiki/MIT_License
.. _available on GitHub: https://github.com/ethers-io/ethers.io
.. _MetaMask: https://metamask.io
.. _Mist: https://github.com/ethereum/mist/releases/
.. _Ethers Wallet: https://itunes.apple.com/us/app/ethers-wallet/id1186052971?mt=8 
.. _Cipher Browser: https://www.cipherbrowser.com 

.. toctree::
   :maxdepth: 3
   :caption: Developer Documentation

   dev-overview
   dev-tutorials
   dev-cli
   dev-api
   dev-security-concerns
   dev-misc

.. EOF
