/** *   Javascript Library - Remember The Milk
 *
 *   @author Michael Day
 *   @since January 27th, 2013
 *   @see http://www.rememberthemilk.com/services/api/
 *
 *   Requires a global md5 function. I recommend this one:
 *   http://www.myersdaily.org/joseph/javascript/md5-text.html
 *
 *   Based on RTM PHP Library by Adam Magaña
 *   @see https://github.com/adammagana/rtm-php-library
 *
 *   License (The MIT License)
 *   
 *   Copyright (c) 2011 Michael Day <manveru.alma@gmail.com>
 *   
 *   Permission is hereby granted, free of charge, to any person obtaining
 *   a copy of this software and associated documentation files (the
 *   'Software'), to deal in the Software without restriction, including
 *   without limitation the rights to use, copy, modify, merge, publish,
 *   distribute, sublicense, and/or sell copies of the Software, and to
 *   permit persons to whom the Software is furnished to do so, subject to
 *   the following conditions:
 *   
 *   The above copyright notice and this permission notice shall be
 *   included in all copies or substantial portions of the Software.
 *   
 *   THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 *   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 *   IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 *   CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *   TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 *   SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
 //This is a modified version of the library for use with UWAP
 

 var List = function(archived, deleted, id, locked, name, position, smart, sort_order, rtm){
	this.archived = archived;
	this.deleted = deleted;
	this.id = id;
	this.locked = locked;
	this.name = name;
	this.position = position;
	this.smart = smart;
	this.sort_order = sort_order;
	this.rtm = rtm;
 };
  
 List.prototype.archive = function(callback) {
	if(this.rtm.timeline == undefined) {
		this.rtm.requestTimeline(this.archive);
	}
	this.rtm.get('rtm.lists.archive', {list_id: listId}, function(resp) {
		callback(resp);
	});
 };
 
 //Note that this is "del", and not "delete" as in the rtm api, because delete is a reserved word in javascript.. 
 List.prototype.del = function(callback) {
	 this.rtm.get('rtm.lists.delete', { timeline: this.rtm.timeline, list_id: this.id}, function(resp) {
			callback(resp);
		});
 };
 
 List.prototype.setDefaultList = function(callback) {
	 this.rtm.get('rtm.lists.setDefaultList', { timeline: this.rtm.timeline, list_id: this.id}, function(resp) {
			callback(resp);
		});
 };
 
 List.prototype.setName = function(callback, name) {
	 this.rtm.get('rtm.lists.setName', { timeline: this.rtm.timeline, list_id: this.id, name: name}, function(resp) {
			callback(resp);
		});
 };
 
 List.prototype.unarchive = function() {
	 this.rtm.get('rtm.lists.unarchive', { timeline: this.rtm.timeline, list_id: this.id}, function(resp) {
			callback(resp);
		});
 };
 
 
 
 var Task = function(created, id, location_id, modified, name, notes, participants, source, tags, task, url, rtm, taskseries, listId) {
	this.created = created;
	this.id = id;
	this.location_id = location_id;
	this.modified = modified;
	this.name = name;
	this.notes = notes;
	this.participants = participants;
	this.source = source;
	this.tags = tags;
	this.task = task;
	this.url = url;
	this.rtm = rtm;
	this.taskseries = taskseries;
	this.listId = listId;
 };
 
 Task.prototype.addTags = function(callback) {
	this.rtm.get('rtm.tasks.addTags', { timeline: this.rtm.timeline, list_id: this.listId}, function(resp) {
		callback(resp);
	});
 };
 
 Task.prototype.complete = function(callback) {
	 this.rtm.get('rtm.tasks.complete', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id}, function(resp) {
		 callback(resp);
	});
 };
 
 // Using "del", not "delete"
 Task.prototype.del = function(callback) {
	this.rtm.get('rtm.tasks.delete', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.movePriority = function(callback, direction) {
	 this.rtm.get('rtm.tasks.movePriority', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, direction: direction}, function(resp) {
			callback(resp);
	});
 };
 
 //Needs from and to list_ids! Not usable yet.
 Task.prototype.moveTo = function(callback) {
	this.rtm.get('rtm.tasks.moveTo', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id}, function(resp) {
			callback(resp);
	});
 };
 
 
 Task.prototype.postpone = function(callback) {
	this.rtm.get('rtm.tasks.postpone', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.removeTags = function(callback, tags) {
	this.rtm.get('rtm.tasks.removeTags', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, tags: tags}, function(resp) {
			callback(resp);
	});
 };
 
 //Currently need all optional args. This should be fixed.
 Task.prototype.setDueDate = function(callback, due, has_due_time, parse) {
	this.rtm.get('rtm.tasks.setDueDate', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, due: due, has_due_time: has_due_time, parse:parse}, function(resp) {
			callback(resp);
	});
 };
 
 
 Task.prototype.setEstimate = function(callback, estimate) {
	this.rtm.get('rtm.tasks.setEstimate', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, estimate: estimate}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.setLocation = function(callback, location_id) {
	this.rtm.get('rtm.tasks.setLocation', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, location_id: location_id}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.setName = function(callback, name) {
	this.rtm.get('rtm.tasks.setName', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, name:name}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.setPriority = function(callback, priority) {
	this.rtm.get('rtm.tasks.setPriority', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, priority: priority}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.setRecurrence = function(callback, repeat) {
	this.rtm.get('rtm.tasks.setRecurrence', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, repeat: repeat}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.setTags = function(callback, tags) {
	this.rtm.get('rtm.tasks.setTags', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, tags: tags}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.setURL = function(callback, url) {
	this.rtm.get('rtm.tasks.setUrl', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id, url: url}, function(resp) {
			callback(resp);
	});
 };
 
 Task.prototype.uncomplete = function(callback) {
	this.rtm.get('rtm.tasks.uncomplete', { timeline: this.rtm.timeline, list_id: this.listId, taskseries_id: this.taskseris, task_id: this.id}, function(resp) {
			callback(resp);
	});
 };
 
var RememberTheMilk = function (appKey, appSecret, permissions, format) {
    this.authUrl = 'https://www.rememberthemilk.com/services/auth/';
    this.baseUrl = 'https://api.rememberthemilk.com/services/rest/';
	this.frob;
	this.frobObj;
    this.WinJS = (typeof WinJS !== 'undefined');
	this.timeline;
	this.lists;
	this.tasks = new Array();
	
	//Gets user's lists, then calls the callback-function
	this.asyncLists = function(callback) {
		var that = this;
		this.get('rtm.lists.getList', function(resp){
			var lists = new Array();
			$.each(resp.rsp.lists.list, function(index, list){
				lists[index] = new List(list.archived, list.deleted, list.id, list.locked, list.name, list.position, list.smart, list.sort_order, that);
			});
			that.lists = lists;
			if(callback){
				callback(lists);
			}
		});
	};
	
	//Gets a list's tasks, then calls the callback-function
	this.asyncTasks = function(listId, callback) {
		var that = this;
		var taskSeries = new Array();
		if(this.tasks.indexOf(listId) != -1) {
			callback(this.tasks.indexOf(listId));
			return;
		}
		else{
			
		}
		this.get('rtm.tasks.getList', {list_id: listId, filter: 'status:incomplete'}, function(resp){
			console.log(resp);
			
			if (!resp.rsp.tasks || !resp.rsp.tasks.list) {
						$('#tasks').html('No tasks!');
						return;
					}
					var tid;
					$.each(resp.rsp.tasks.list, function(index, listItem){
						tid = listItem.id;
						if (Object.prototype.toString.call(listItem.taskseries) != '[object Array]') {
							listItem.taskseries = [listItem.taskseries];
						}

						$.each(listItem.taskseries, function(index, task){
							console.log(task);
							taskSeries.push(new Task(task.created, task.id, task.location_id, task.modified, task.name, task.notes, task.participants, task.source, task.tags, task.task, task.url, that, tid, listId));
						});
					});
			that.tasks[that.tasks.indexOf(listId)] = taskSeries;
			callback(taskSeries);
		});		
		
	};
	
	//Starts a new timeline. 
	this.requestTimeline = function(callback) {
		var that = this;
		this.get('rtm.timelines.create', {}, function(resp) {
			console.log(resp);
			that.timeline = resp.rsp.timeline;
			if(callback){callback();}
		});
		
	}
	
	//Used for logging in, using UWAP.store to save authentication information. Calls callback when logged in.
	this.uwapLogin = function(callback) {
		var that = this;
		UWAP.store.queryOne({RTMfrob:true}, function(res) {
			console.log(res);
			if(res != null && res.frob){
				console.log(res.frob);
				frob = res.frob;
				frobObj = res;
			}
			if(frob != undefined) {
				if(frobObj.auth != undefined && frobObj.auth.token != undefined) {
					that.auth_token = frobObj.auth.token;
					that.get('rtm.auth.checkToken', {auth_token: frobObj.auth.token}, function(resp){
						if(resp.rsp.stat == 'ok'){
							// console.log(callback);
							callback();
						}
						else{
							console.log(resp);
							console.log('Stored token is invalid; getting new...');
							that.getFrob(callback);
						}
					});
					
				}
				else{
					that.get('rtm.auth.getToken', {frob: frob}, function(resp){
						console.log(resp);
						
						if(resp.rsp.stat == "fail"){
							
							that.getFrob(callback);
						}
						else{
							that.auth_token = resp.rsp.auth.token;
							callback();
						}
					});
				}
			}
			else{
				that.getFrob(callback);
			}
		});
	};
	
	//Used by uwapLogin when a frob is not valid or no frob has been stored yet. Calls callback when fully authenticated.
	this.getFrob = function(callback){
		var that = this;
		that.get('rtm.auth.getFrob', function(resp){
			console.log(resp);
			// $('#auth').attr('disabled', null);
			frob = resp.rsp.frob;
			
			//Save the frob for later
			if(frobObj != undefined) {
				frobObj.frob = frob;
			}
			else{
				frobObj = { RTMfrob: true, frob: frob};
			}
			UWAP.store.save(frobObj, function() { console.log('Saved frobObj:'); console.log(frobObj);}, function(err) {console.log(err)});
			
			//Get auth
			var authUrl = that.getAuthUrl(frob);
			console.log(authUrl);
			popup = window.open(authUrl);

			checkPopup = setInterval(function(){
				if (popup.closed == true) {
					clearInterval(checkPopup);

					that.get('rtm.auth.getToken', {frob: frob}, function(resp){
							console.log(resp);
							if(resp.rsp.stat != 'fail') {
								frobObj.auth = resp.rsp.auth;
								UWAP.store.save(frobObj, function() { console.log('Saved frobObj:'); console.log(frobObj);}, function(err) {console.log(err)});
							}
							that.auth_token = resp.rsp.auth.token;
						
						callback();
					});
				}
			}, 200);
		});
	};
	
	//From original rtm.js below here. ( https://github.com/manverualma/rtm-js per march 2013 )
	
    var appKey = (appKey) ? appKey : '',
		appSecret = (appSecret) ? appSecret : '',
		permissions = (permissions) ? permissions : 'read',
		format = (format) ? format : 'json';

    if (!appKey || !appSecret) {
        throw 'Error: App Key and Secret Key must be defined.';
    }

    this.appKey = appKey;
    this.appSecret = appSecret;
    this.permissions = permissions;
    this.format = format;

    /**
	 * Encodes request parameters into URL format 
	 * 
	 * @param params    Array of parameters to be URL encoded
	 * @param signed    Boolean specfying whether or not the URL should be signed
	 * @return          Returns the URL encoded string of parameters
	 */
    this.encodeUrlParams = function (params, signed) {
        var params = (params) ? params : {},
			signed = (signed) ? signed : false,
			paramString = '',
			count;

        params.format = this.format;
        params.api_key = this.appKey;

        count = 0;

        // Encode the parameter keys and values
        for (key in params) {
            if (count == 0) {
                paramString += '?' + key + '=' + encodeURIComponent(params[key]);
            } else {
                paramString += '&' + key + '=' + encodeURIComponent(params[key]);
            }

            count++;
        }

        // Append an auth signature if needed
        if (signed) {
            paramString += this.generateSig(params);
        }

        return paramString;
    };

    /**
	 * Generates a URL encoded authentication signature
	 * 
	 * @param params    The parameters used to generate the signature
	 * @return          Returns the URL encoded authentication signature
	 */
    this.generateSig = function (params) {
        var params = (params) ? params : {},
			signature,
			signatureUrl,
			i,
			k;

        signature = '';
        signatureUrl = '&api_sig=';

        keys = Object.keys(params),
		keys.sort();

        for (i = 0; i < keys.length; i++) {
            signature += keys[i] + params[keys[i]];
        }

        signature = this.appSecret + signature;
        signatureUrl += md5(signature);

        return signatureUrl;
    };

    /**
	 * Generates a RTM authentication URL
	 * 
	 * @param frob Optional frob for use in desktop applications
	 * @return     Returns the reponse from the RTM API
	 */
    this.getAuthUrl = function (frob) {
        var params, url;

        params = {
            api_key: this.appKey,
            perms: this.permissions
        };

        if (frob) {
            params.frob = frob;
        }

        url = this.authUrl + this.encodeUrlParams(params, true);

        return url;
    };

    /**
	 * Main method for making API calls
	 * 
	 * @param method    Specifies what API method to be used
	 * @param params    Array of API parameters to accompany the method parameter
	 * @param callback  Callback to fire after the request comes back
	 * @return          Returns the reponse from the RTM API
	 */
    this.get = function (method, params, callback) {
        var method = (method) ? method : '',
		    params = (params) ? params : {},
		    callbackName,
		    requestUrl,
		    s;

        if (!callback && typeof params == 'function') {
            callback = params;
            params = {};
        }

        if (!callback) {
            callback = function () {};
        }

        if (!method) {
            throw 'Error: API Method must be defined.';
        }

        params.method = method;

        if (!this.WinJS) {
            callbackName = 'RememberTheMilk' + new Date().getTime();
            params.callback = callbackName;
        }

        if (this.auth_token) {
            params.auth_token = this.auth_token;
        }

        requestUrl = this.baseUrl + this.encodeUrlParams(params, true);

        if (!this.WinJS) {
            window[callbackName] = function (resp) {
                callback.call(this, resp);
                window[callbackName] = null;
            }

            s = document.createElement('script');
            s.src = requestUrl;
            document.body.appendChild(s);
        } else {
            return WinJS.xhr({responseType: 'json', url: requestUrl}).done(
                function completed(resp) {
                    callback.call(this, JSON.parse(resp.responseText));
                }
            );
        }
    };
}
// return RememberTheMilk;
// });