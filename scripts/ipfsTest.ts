const IPFS = require('ipfs-mini');
const ipfs = new IPFS({host: '13.214.254.61', port: 4001, protocol: 'https'});


async function main() {

    ipfs.add('hello world!').then(console.log).catch(console.log);

// result null 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j'

    ipfs.cat('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j', (err: any, result: any) => {
        console.log(err, result);
    });

// result null 'hello world!'

    ipfs.addJSON({somevalue: 2, name: 'Nick'}, (err: any, result: any) => {
        console.log(err, result);
    });

// result null 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j'

    ipfs.catJSON('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j').then(console.log).catch(console.log);

// result null { somevalue: 2, name: 'Nick' }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
