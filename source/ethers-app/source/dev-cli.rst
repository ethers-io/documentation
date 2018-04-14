Command Line Interface (CLI)
****************************

The Ethers Command Line Interface (CLI) allows developers to create, debug,
deploy and manage applications on the *ethers.space* hosting service.

**Installing ethers-cli**::

    /Users/ricmoo> sudo npm install -g ethers-cli

Note:
    You need `node.js`_ and `git`_ installed.


-----


Overview
========

The *ethers.space* system allows you to host simple applications (for free)
without the use of usernames and passwords stored on a server. Instead any
normal Ethereum account can be used to sign and publish to the the servers.

Each application received its own domain name, so that it can reliably use
browser security feartures, such as cookies and local storage.

All applications must be managed through git, which allows the toolchain
to provide helpful *diffs* between live files, the git repository and the
production files.


-----


Usage
=====

::

    /Users/ricmoo> ethers-deploy --help

    Command Line Interface - ethers/4.0.0

    ethers-deploy compile FILENAME_SOL [ Compiler Options ]

    ethers-deploy run FILENAME_JS [ Node + Account + Tx Options ]
    ethers-deploy deploy FILENAME_SOL [ Node + Account + Tx Options ]

    ethers-deploy serve [ GIT_HASH ] [--host HOST] [ --port PORT ] [ Node Options ]

    ethers-deploy init [ FILENAME ]
    ethers-deploy publish [ GIT_HASH ] [ PATH ] [ Account Options ]
    ethers-deploy status [ Account Options ]

    Compile Options
      --bytecode            Only output bytecode
      --interface           Only output the JSON interface
      --solc                Output the entire solc output
      --optimize            Run the optimizer

    Node Options
      --network NETWORK     Use NETWORK configuration (default: homestead)
      --rpc URL             Use the Ethereum node at URL

    Account Options
      --account FILENAME    Use the JSON wallet

    Transaction Options
      --gas-price GWEI      Override the gas price
      --gas-limit LIMIT     Override the gas limit
      --nonce NONCE         Override the nonce (.sol only)
      --value ETHER         Send ether (.sol only)

    Options
      --help                Show this help
      --version             Show the version


-----


init
----

Creates a new account.json in the current directory. This file is password
protected and the password cannot be retreived if you forget it.

Without this file and your password, you cannot update your application.

**Keep it SAFE**.

You also need to create a git repository to manage an application.

*Example:* ::

    # Create a directory for your application
    /Users/ricmoo> mkdir my-app

    # Create a git repository
    /Users/ricmoo> git init
    Initialized empty Git repository in /Users/ricmoo/my-app/.git/
    
    # Create your ethers account.json
    /Users/ricmoo> ethers-deploy init
    Do NOT lose or forget this password. It cannot be reset.
    New Account Password: ******
    Confirm Password: ******
    Encrypting Account... (this may take a few seconds)
    Account successfully created. Keep this file SAFE. Do NOT check it into source control.


-----


status
------

Displays the details and current status of the account. The Git Tag can be used
to perform ``git diff`` against the current deployed version and the repository.

*Example:* ::

    /Users/ricmoo/my-app> ethers-deploy status

    Status:
      Address:   0xf01EE6669078e5eC9A452fd60B7d18D41b53163E
      PubNonce:  1
      Git Tag:   af7c9f846fb2958f0a7c7a97f7ab637d14784b73
      Raw URL:   https://0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/

    Application URLs:
      Mainnet:  https://ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/
      Ropsten:  https://ropsten.ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/
      Rinkebey: https://rinkeby.ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/
      Kovan:    https://kovan.ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/


-----


serve
-----

Run a local webserver, hosting the application for testing against the production
ethers.io websites.

If ``--rpc`` is provided, the custom node will be loaded into the application
by the custom-rpc.ethers.io container.

*Example:* ::

    /Users/ricmoo/my-app> ethers-deploy serve --rpc http://localhost:7545
    Serving content from file:///Users/ricmoo/Development/ethers/tutorials/simplestore
    Listening on port: 8080
    Local Application Test URL:
      http://custom-rpc.ethers.io/?port=7545#!/app-link-insecure/localhost:8080/


-----


publish
-------

Deploy your application to the production environment. You can determine the URL
of your production environment using `status`_.

*Example:* ::

    /Users/ricmoo/my-app> ethers-deploy publish
    Account Password (homestead:./account.json): *************
    Sign Message:
        Message: ...
    Sign Message? [y/n]: y

    Successfully deployed!

    Application URLs:
      Mainnet:  https://ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/
      Ropsten:  https://ropsten.ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/
      Rinkebey: https://rinkeby.ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/
      Kovan:    https://kovan.ethers.io/#!/app-link/0xf01ee6669078e5ec9a452fd60b7d18d41b53163e.ethers.space/

Note:
    Once you have deployed your application, it may take up to 2 minutes
    for the server caches to clear and the new version to be visible.


-----


.. _node.js: https://docs.npmjs.com/getting-started/installing-node
.. _git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


