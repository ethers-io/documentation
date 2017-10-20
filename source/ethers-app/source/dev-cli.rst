Command Line Interface (CLI)
****************************

The Ethers Command Line Interface (CLI) allows developers to create, debug,
deploy and manage applications on the *ethers.space* hosting service.

**Installing ethers-cli**::

    /Users/ricmoo> sudo npm install -g ethers-cli

Note:
    You need `node.js <install-node>`_ and `git <install-git>`_ installed.

-----

Overview
========

The *ethers.space* system allows you to host simple applications (for free)
without the use of usernames and passwords stored on a server. Instead any
normal Ethereum account can be used to sign and publish to the the servers.

Each application received its own domain name, so that it can reliably use
browser security feartures, such as cookies and local storage.

Application are bundled as a **slug** which includes the zipped contents
(and hashes) of your files, with an optional signature.

All applications must be managed additionally through git, which allows the
toolchain to provide helpful *diffs* between live files, the git repository
and the production files.

Unsigned slugs are useful for testing, as you can share them with friends (or
a team of QA) without the ability to be published.

Only signed slugs can be uploaded to *ethers.space*. Once ready, anyone with the
account.json and password can sign the slug and deploy it to production. Or you
can create a signed slug and set a cronjob to deploy it at a specific time.

-----

Usage
=====

::

    /Users/ricmoo> ethers --help

    Command Line Interface - ethers/0.0.2

    Usage:
        ethers init
        ethers status [--head] [--slug SLUG1] [--slug SLUG2] [--published]
        ethers diff [--head] [--slug SLUG1] [--slug SLUG2] [--published]
        ethers prepare [--signed]
        ethers serve [--slug SLUG] [--port PORT] [--testnet]
        ethers push --slug SLUG

        Options:
            --help            show this help screen
            --version         show the software version
            --testnet         use the morden testnet

        Commands:
            init       creates a new account.json
            status     show status of package
            prepare    create a pre-packaged slug
            serve      locally host the app and browser
            push       deploys a slug to ethers.space
    

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
    /Users/ricmoo> ethers init
    Do NOT lose or forget this password. It cannot be reset.
    New Account Password: ******
    Confirm Password: ******
    Encrypting Account... (this may take a few seconds)
    Account successfully created. Keep this file SAFE. Do NOT check it into source control.

-----

status
------

Displays the details and current status of the package, including files that
have changed since the last git commit or since last published to production.

--head
    Compare against the head of the git repository.

--slug SLUG
   Compare against the contents of *SLUG*. This may be used twice to compare two slugs.

--published
   Compare against the contents the are currently in production.


By default, the files are compared against the live files (if no options, published
is assumed).

*Example:* ::

    /Users/ricmoo/my-app> ethers status
    Address: 0xa5681b1fbDA76E0d4aB646E13460a94fDcD3c1C1
    URL:     https://0xa5681b1fbda76e0d4ab646e13460a94fdcd3c1c1.ethers.space
    No files changed.
    

-----

diff
----

Show all difference between the files.

--head
   Compare against the head of the git repository.

--slug SLUG
   Compare against the contents of *SLUG*. This may be used twice to compare two slugs.

--published
   Compare against the contents the are currently in production.

By default, the files are compared against the live files (if no options, published
is assumed).

*Example:* ::

    # Compare the contents of unsigned.slug to the live files
    /Users/ricmoo/my-app> ethers diff --slug unsigned.slug

    # Compare the contents of unsigned.slug to the production files
    /Users/ricmoo/my-app> ethers diff --slug unsigned.slug --published


-----


prepare
-------

Create a slug for sharing or deployment from the head in the git repository.

--signed
    Sign the slug so that anyone may deploy it to production. This will require
    the account.json and password.

If you leave a slug unsigned, it can be signed during the `push`_ step.

*Example:* ::

    /Users/ricmoo/my-app> ethers prepare
    Adding:
        index.html

    /Users/ricmoo/my-app> ethers prepare --signed
    Account Password: ************
    Adding:
        index.html

-----

serve
-----

Run a local webserver, hosting the ethers.io website and your application
for local testing and demonstrations.

--slug SLUG
    Serve the contents of *SLUG* instead of the live files.

--port PORT
    Connect the webserver on *PORT*. (default: 8080)

--testnet
    Use the Ethereum testnet (Ropsten)

This modifies the ethers.io sandbox container to allow insecure connections
over http using the *app-link-insecure* type, which is not available in
production. Make sure all external resources will be fetched over HTTPS.

*Example:* ::

    /Users/ricmoo/my-app> ethers serve --testnet
    Serving content from file:///Users/ricmoo/my-app
    Listening on port: 8080
    Server Ethers app: http://localhost:8080/_/#!/app-link-insecure/localhost:8080/

If you then open your web browser to http://localhost:8080/_/#!/app-link-insecure/localhost:8080/
you will see your application running.

-----

push
----

Deploy your application to the production environment. You can determine the URL
of your production environment using `status`_.

--slug SLUG
    The prepared slug to deploy. If the slug was not signed, you will
    be prompted for the account password, which will be used to sign
    the slug uploaded to *ethers.space*. **(required)**

*Example:* ::

    # Deploy an unsigned slug
    /Users/ricmoo/my-app> ethers push --slug unsigned.slug
    Account Password: ******
    Successfully deployed!

    # Deploy a signed slug
    /Users/ricmoo/my-app> ethers push --slug 0xBb20dc4D5335BF696E0Bf750bdB3E9eCf96d3B02.slug
    Successfully deployed!

Note:
    Once you have deployed your application, it may take up to 2 minutes
    for the server caches to clear and the new version to be visible.

-----

.. _node.js: https://docs.npmjs.com/getting-started/installing-node
.. _install-git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
