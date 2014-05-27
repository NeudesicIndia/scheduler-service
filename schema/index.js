(function (schema){
	
	schema.schedule = {
			"id": "/scheduleschema",
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
				    },
				    "required": true
				},
				"request": {
					"id": "/schedulerequest",
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
				    },
				    "required": true,
				},
				"user": {
					"type": "string",
					"required": true
				},
				"scheduleCRONexp": {
					"type": "string",
					"required": true
				},
				"custom": {
					"type": "object",
					"required": false
				},
				"options": {
					"id": "/scheduleoptions",
				    "type": "object",
				    "properties": {
				    	"multipart": {
				    		"type": "string",
				    		"required": false
				    	}
				    },
				    "required": false
				}
		    }
	};
	
})(module.exports);