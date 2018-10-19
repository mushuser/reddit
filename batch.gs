redditlib.init_project(subreddit, creds_1, creds_voters, folder_id, flair_mapping)
redditlib.check_init()


updaterlib.init_project(doc_filename, doc_id, doc_wiki, page_header)
updaterlib.check_init()


mlablib.init_project(mlab)
mlablib.check_init()


function batch_month() {
  console.info("batch_month()")
  updaterlib.batch_update_doc_force()
  updaterlib.batch_set_arg_queue()
}


function batch_day1() {
  console.info("batch_day1()")
  redditlib.batch_del_old_comments()
}


function batch_day2() {
  console.info("batch_day2()")
  updaterlib.batch_update_doc()
}


function batch_hours12() {
  console.log("batch_hours12()")  
  redditlib.batch_save_wikis_gd()
}


function batch_hours2() {
  console.info("batch_hours2()")
  redditlib.batch_add_goodposts()
}

// 15m
function batch_comments_snapshot() {
  var new_comments = redditlib.get_comments(20)
  var new_c_names = redditlib.get_names_fr_obj(new_comments)
  
  for(var i=0; i<new_c_names.length; i++) {
    var count = mlablib.get_matched_count("snapshot", new_c_names[i])
    
    if(count > 0) {
      continue  
    }
    
    var parent_full = redditlib.get_parent_full(new_c_names[i])
    var title = redditlib.get_parent_data(parent_full).title
    
    var doc = {
      name:new_c_names[i],
      data:parent_full
    }
    
    var r = mlablib.insert_documents("snapshot", doc) 
    
    if(r) {
      console.log("new snapshot inserted:%s:%s:%s", new_c_names[i], title, parent_full)
    } else {
      console.log("snapshot not inserted:%s:%s:%s", new_c_names[i], title, parent_full) 
    }   
  }
}


function doGet(e) {
  var name = e.parameter.name
  var dir = e.parameter.dir
  var data = redditlib.get_parent(name)
  var age = redditlib.get_age(data.created_utc)
  var title = data.title.slice(0,15)

  var obj = {
    "name":name,
    "dir":dir,
    "age":age,
    "title":title,
    "voter":redditlib.voter_obj.voter
  }
  console.log("received:%s", obj)
  redditlib.set_arg_queue(obj)
  
  var json_text = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); 
  return json_text
}


function clean_arg() {
  redditlib.clean_argument("VOTER_QUEUE")
  redditlib.clean_argument("ARG_QUEUE")
  dump_arg()
}


function dump_arg() {
  Logger.log(redditlib.dump_argument("VOTER_QUEUE"))
  Logger.log(redditlib.dump_argument("ARG_QUEUE"))
}

// 1 week
function batch_set_arg_queue() {
  redditlib.batch_set_arg_queue()  
}

// 10 minute
function batch_voter_vote() {
  redditlib.batch_voter_vote()  
}