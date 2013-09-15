define(function(require, exports, module) {

	var 
		$ = require('jquery'),
		hogan = require('uwap-core/js/hogan'),
//		mocha = require('lib/mocha'),
		// rtm = require(rtm),
		UWAP = require('uwap-core/js/core');
		
	//require('lib/mocha');
	//require('lib/expect');
	require("lib/director");
	
	require("uwap-core/js/uwap-people");
	require('uwap-core/bootstrap/js/bootstrap');	
//	require('uwap-core/bootstrap/js/bootstrap-collapse');
	// require('uwap-core/bootstrap/js/bootstrap-modal');
//	require('uwap-core/bootstrap/js/bootstrap-typeahead');
//	require('uwap-core/bootstrap/js/bootstrap-button');
//	require('uwap-core/bootstrap/js/bootstrap-tooltip');
	require('uwap-core/bootstrap/js/bootstrap-tab');
	
	var tmpl = {
//		    "detCont": require('uwap-core/js/text!templates/detailsContainer.html')
	};
	
	var templates = {
//			"appdashboard": hogan.compile(tmpl.appdashboard),
	};
	
	var rtm = new RememberTheMilk('key', 'secret', 'delete');
	var frob;
	var frobObj;
	
	
	
	var listLists = function(lists) {
		$('#milk').html('');
		$.each(lists, function(index, list){
			$('<button>').html(list.name).data({
					id: list.id
				}).addClass('list').addClass('btn-info')
				.appendTo($('#lists'));
		});
		$('button.list').click(function(){
			$('#tasks').html('Loading...');
				var listId = $(this).data('id');
				rtm.asyncTasks(listId, listTasks);
		});
	}
	
	var listTasks = function(tasks) {
		$('#tasks').html('');
		$.each(tasks, function(index, task){
			var div = $('<div>').addClass('task-div');
			$('<input>').attr('type', 'checkbox').appendTo(div);
			$('<span>').html(task.name).appendTo(div);

			div.appendTo($('#tasks'));
		});
	}
	
	var loadLists = function(){
		// $('#auth').hide();
		$('#milk').html('Loading your lists..');
		rtm.asyncLists(listLists);
		// rtm.get('rtm.lists.getList', function(resp){
			// $('#milk').empty();
			// console.log(resp);
			// $.each(resp.rsp.lists.list, function(index, list){
				// $('<button>').html(list.name).data({
					// id: list.id
				// }).addClass('list').addClass('btn-info')
				// .appendTo($('#lists'));
			// });

			// $('button.list').click(function(){
				// $('#tasks').html('Loading...');
				// var listId = $(this).data('id');

				// rtm.get('rtm.tasks.getList', {list_id: listId, filter: 'status:incomplete'}, function(resp){
					// $('#tasks').empty();
					// console.log(resp);
					// if (!resp.rsp.tasks || !resp.rsp.tasks.list) {
						// $('#tasks').html('No tasks!');
						// return;
					// }

					// $.each(resp.rsp.tasks.list, function(index, listItem){
						// if (Object.prototype.toString.call(listItem.taskseries) != '[object Array]') {
							// listItem.taskseries = [listItem.taskseries];
						// }

						// $.each(listItem.taskseries, function(index, task){
							// var div = $('<div>').addClass('task-div');
							// $('<input>').attr('type', 'checkbox').appendTo(div);
							// $('<span>').html(task.name).appendTo(div);

							// div.appendTo($('#tasks'));
						// })
					// });
				// })
			// })
		// });
	};
	
	$(document).ready(function() {
		// console.log(loadLists);
		rtm.uwapLogin(loadLists);
		// console.log('test');
		// UWAP.store.queryOne({RTMfrob:true}, function(res) {
			// console.log(res);
			// if(res != null && res.frob){
				// console.log(res.frob);
				// frob = res.frob;
				// frobObj = res;
			// }
			// if(frob != undefined) {
				// if(frobObj.auth != undefined && frobObj.auth.token != undefined) {
					// rtm.auth_token = frobObj.auth.token
					// loadLists();
				// }
				// else{
					// rtm.get('rtm.auth.getToken', {frob: frob}, function(resp){
						// console.log(resp);
						
						// if(resp.rsp.stat == "fail"){
							
							// getFrob(loadLists);
						// }
						// else{
							// rtm.auth_token = resp.rsp.auth.token;
							// loadLists();
						// }
					// });
				// }
			// }
			// else{
				// getFrob(loadLists);
			// }
		// });
	});
	
	// var getFrob = function(callback){
		// rtm.get('rtm.auth.getFrob', function(resp){
			// console.log(resp);
			// // $('#auth').attr('disabled', null);
			// frob = resp.rsp.frob;
			
			// //Save the frob for later
			// if(frobObj != undefined) {
				// frobObj.frob = frob;
			// }
			// else{
				// frobObj = { RTMfrob: true, frob: frob};
			// }
			// UWAP.store.save(frobObj, function() { console.log('Saved frobObj:'); console.log(frobObj);}, function(err) {console.log(err)});
			
			// //Get auth
			// var authUrl = rtm.getAuthUrl(frob);
			// console.log(authUrl);
			// popup = window.open(authUrl);

			// checkPopup = setInterval(function(){
				// if (popup.closed == true) {
					// clearInterval(checkPopup);

					// rtm.get('rtm.auth.getToken', {frob: frob}, function(resp){
							// console.log(resp);
							// if(resp.rsp.stat != 'fail') {
								// frobObj.auth = resp.rsp.auth;
								// UWAP.store.save(frobObj, function() { console.log('Saved frobObj:'); console.log(frobObj);}, function(err) {console.log(err)});
							// }
							// rtm.auth_token = resp.rsp.auth.token;
						
						// callback();
					// });
				// }
			// }, 200);
		// });
	// };
	
});