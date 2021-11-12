


const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

const plays_content = JSON.parse(plays);
console.log(plays_content);

/*
 To get a specific play, add play's id property (in plays.json) via query string, 
   e.g., url = url + '?name=hamlet';
 
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=macbeth
 
 NOTE: Only a few plays have text available. If the filename property of the play is empty, 
 then there is no play text available.
*/


/* note: you may get a CORS error if you test this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/


function display_available_plays() {
  var play_list = document.getElementById('ulPlayList');
  play_list.innerHTML = '';
  var li;
  for (let i in plays_content) {
    li = document.createElement('li');
    li.setAttribute('id', plays_content[i].id);
    li.setAttribute('likely-date', plays_content[i].likelyDate);
    li.appendChild(document.createTextNode(plays_content[i].title));
    play_list.appendChild(li);
  }
  console.log(play_list);
  return play_list;
}

function display_available_plays_by_name() {
  console.log("sort by name");
  var play_list = display_available_plays();
  play_list = sortList(play_list, 'sort_by_title');
}

function display_available_plays_by_date() {
  console.log("sort by date");
  var play_list = display_available_plays();
  play_list = sortList(play_list, 'sort_by_likely-date');
}

function get_item_from_plays_content(id, item) {
  
  for(let i in plays_content){
    if(id == plays_content[i].id){
      switch (item) {
        case 'filename':
          return plays_content[i].filename;   
        case 'title':
          return plays_content[i].title;
        case 'likelyDate':
          return plays_content[i].likelyDate;
        case 'genre':
          return plays_content[i].genre;
        case 'wiki':
          return plays_content[i].wiki;
        case 'gutenberg':
          return plays_content[i].gutenberg;
        case 'shakespeareOrg':
          return plays_content[i].shakespeareOrg;
        case 'synopsis':
          return plays_content[i].synopsis;
        case 'desc':
          return plays_content[i].desc;
      }
    }
  }
}

function set_selected_play(id) {
  let h2_play_title = document.getElementsByTagName('h2');
  h2_play_title[0].innerHTML = '';
  h2_play_title[1].innerHTML = '';
  let h2_title = get_item_from_plays_content(id, 'title');
  h2_play_title[0].appendChild(document.createTextNode(h2_title));
  h2_play_title[1].appendChild(document.createTextNode(h2_title));
  
    
  console.log(h2_play_title);
}







document.addEventListener('DOMContentLoaded', () => {

  //#3
  //initial display: sorted name
  //event: radio: sorted name | sorted likely date
  //add icon to plays with text available ------------------------------->(TODO)

  display_available_plays_by_name();

  // Sort changes when the radio is selected [by name | by date]
  let radio = document.getElementById('playList');
  radio.addEventListener('change', function (e) {
    let target = e.target;
    switch (target.id) {
      case 'name':
        display_available_plays_by_name();
        break;
      case 'date':
        display_available_plays_by_date();
        break;
    }
  });

  // Prints the content of the selected play on Available Plays
  let click_available_plays = document.getElementById('ulPlayList');
  click_available_plays.addEventListener('click', function (e) {
    set_selected_play(e.target.id);
    console.log(e.target.id); //test
  });

});