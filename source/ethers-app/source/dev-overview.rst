Overview
********

This overview is intended for developers who wish to create Ethereum
distributed applications (dApps) using Ethers.

Ethers Wallet Container applications live inside an iframe which sandboxes them
from each other and from private data (such as private keys).

For read-only operations the application connect to the Ethereum blockchain
directly.

For writing to the blockchain, the dApp passes messages and transactions to the
container and relinquishes control of the application. Once the user has approved
(or declined) the transaction, control is returned to the dApp and a signed copy
of the message or transaction is passed back.

The `Ethers App Library`_ handles all this interaction for you and provides
the :ref:`high-level API <dev-api>` you will likely require.

-----

Sandbox Architecture
====================

Applications are isolated in their own sandbox by running in an **iframe**,
each hosted on a separate domain, ensuring that a browser's cross-origin
policies will protect each application's state from another application's
state as well as the Ethers Wallet Container.

.. image:: ./_static/assets/dev-sandbox.svg
    :align: center
    :alt: sandbox design
    :width: 100%

Private Key
    The private key **NEVER** leaves the secure Ethers container and is
    never sent to any server nor shared with any application. The private
    key is **never** stored unencrypted, and the decrypted key is only
    kept in memory, within isolated closures.

Secure Communication and Storage
    All dApps should run on a separate domain, ensuring the only communication
    between Ethers Wallet Container and the dApp occurs over the
    `Window postMessage API`_. This also ensures the localStorage of a dApp
    cannot access the Ethers Wallet Container localStorage nor the localStorage
    of any other dApp.

    If you are hosting multiple applications on the same domain, keep in 
    mind they will share a localStorage.

URL Privacy
    The Ethers container loads the URL indicated in the fragment (component
    after the hash) into the iframe. Since `a fragment is never sent to the server`_
    this remains private even from Ethers. Only the dApp knows it was loaded.

Applications
    An dApp can be written in any web technology. It may be a single static
    page, a single page with a backend AJAX responder, or a multi-page site. There
    are no restrictions, as long as pages that need to interact with Ethers are
    served over HTTPS.

-----

Serving Content
===============

Content for an Ethereum dApp may be served using nearly any service or technology,
Simply include the `Ethers App Library`_ (or download a copy and serve it yourself)::

    <script src="https://cdn.ethers.io/scripts/ethers-app-v0.4.min.js"
            charset="utf-8" type="text/javascript">
    </script>

For security, we recommend downloading the Ethers App Library and serving it from the
same host serving the content, so that there is no trust required from our CDN.

Here is a quick list of some services we recommend for building Ethers applications:

Amazon Web Services S3 + CloudFront
    A very affordable (for low-traffic sites, free) option to host static
    content (HTML, images, videos, et cetera) over HTTPS using CloudFront.

Heroku
    A very affordable (and for low-traffic sites, free) option to host dynamic
    content over HTTPS with access to various databases. Heroku supports node.js,
    PHP, Rails, and many more.

ethers.space
    A free service, provided by Ethers for small static applications. See the
    :ref:`Tutorials <dev-tutorials>`.


-----

Application Links
=================

An Ethers URL contains the applications URL in the fragment in the form::

    https://ethers.io/#!/app-link/ [URL without https:// here]

Or, if you are running Ethers locally, you can load insecure (HTTP) content for
testing::

    https://ethers.io/#!/app-link-insecure/ [URL without http:// here]

Fragments are never sent to a server, so the destination of the application
remains private even from the servers hosting Ethers.

The link will appear in the Ethers container status bar at the bottom, and you
can enter a URL here manually.

-----

.. _Window postMessage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
.. _a fragment is never sent to the server: https://tools.ietf.org/html/rfc3986#section-3.5
.. _available on GitHub: https://github.com/ethers-io/ethers-server
.. _Ethers App Library: https://cdn.ethers.io/scripts/ethers-app-v0.4.js
