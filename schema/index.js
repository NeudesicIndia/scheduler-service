(function (schema){
	
	schema.schedule = {
			"id": "/schedulerschema",
		    "type": "object",
		    "properties": {
		    	"id": {
					"type": "string", "required": false
				},
				"email": {
					"id": "/scheduleremail",
				    "type": "object",
				    "properties": {
				    	"from":{
							"type": "string", "required": true
						},
						"to": {
							"type": "array",
							"items": {"type": "string"},
							"required": true
						},
						"cc": {
							"type": "array",
							"items": {"type": "string"},
							"required": false
						},
						"bcc": {
							"type": "array",
							"items": "string",
							"required": false
						}
				    }
				},
				"request": {
					"id": "/schedulerrequest",
				    "type": "object",
				    "properties": {
				    	"url": {
							"type": "string",
							"required": true
						},
						"payload": {
							"type": "string",
							"required": false
						}
				    }
				},
				"custom": {
					"type": "object",
					"required": false
				}
		    }
	};
	
})(module.exports);