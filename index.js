const app = new Vue({
	el: "#root",
	data: {
		messages: [],
		input_msg: "",
		password: "",
	},
	methods: {
		send_msg() {
			let msg = this.input_msg;
			let password = this.password;
			console.log("Password: ", password);
			console.log("Sending message:", msg);
			this.messages.push("You: " + msg);

			let chat_api = "https://openai.weixin.qq.com/openapi/nlp/casual_chat/"+"ZomtB0FsfmJdB8DAllRzyXoA3aCu"+password[0]+password[1];

			let jwt_header = {
				alg: "HS256",
				typ: "JWT",
			};
			let jwt_payload = {
				uid: "test_user",
				data: {
					q: msg,
				}
			}
			let encoding_key = "oUexWgSny3rTaPv7lzV7oKXGknJtPtZqNVVlzL5P3a"+password[2];
			let jwt_data = KJUR.jws.JWS.sign("HS256", JSON.stringify(jwt_header), JSON.stringify(jwt_payload), encoding_key);;
			console.log("Sending data:", jwt_data);

			fetch(chat_api, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({query: jwt_data}),
			})
			.then(res => res.json())
			.then(data => {
				if (data.response) {
					this.messages.push("Bot: " + response);
				}
			});
			this.input_msg = "";
		},
	}
})