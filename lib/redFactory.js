export default[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_greeting",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_count",
				"type": "uint8"
			},
			{
				"internalType": "bytes32[]",
				"name": "_valid_hashes",
				"type": "bytes32[]"
			}
		],
		"name": "createRedEnvelope",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEnvelopes",
		"outputs": [
			{
				"internalType": "contract RedEnvelope[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatest",
		"outputs": [
			{
				"internalType": "contract RedEnvelope",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]