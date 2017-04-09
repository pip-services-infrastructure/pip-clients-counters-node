# Counters Microservice Client SDK for Node.js

This is a Node.js client SDK for [pip-services-counters](https://github.com/pip-services-infrastructure/pip-services-counters-node) microservice.
It provides an easy to use abstraction over communication protocols:

* HTTP/REST client
* Seneca client (see http://www.senecajs.org)
* Direct client for monolythic deployments
* Null client to be used in testing

This client SDK also contains Direct, REST and Seneca loggers that allow to directly log into the microservice.

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-counters-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-counters-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8003
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.CountersHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Write counter
client.writeCounter(
    null,
    { 
        type: 'restart',
        source: 'server 1',
        counter: 'Server restarted'
    },
    function (err, event) {
        ...
    }
);
```

```javascript
var now = new Date();

// Get counters
client.readCounters(
    null,
    {
        from: new Date(now.getTime() - 24 * 3600 * 1000),
        to: now,
        source: 'server 1'
    },
    {
        total: true,
        skip: 0, 
        take: 100
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

