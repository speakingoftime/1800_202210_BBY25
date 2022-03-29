// If user is logged in, get the language preference from their profile
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      console.log("Logged in");
      if (doc.data().language === "Cn") {
        translateToCn();
      } else {
        // changeLangEng();
      }
    })
  } else {
    // Get the language setting from Local Storage if user is not logged in
    console.log(localStorage.getItem("Language"));
    if (localStorage.getItem("Language") === "Cn") {
      translateToCn();
      console.log("translating");
    } else {
      // changeLangEng();
    }
  }
});

// Translate to Chinese simplified in sections
function translateToCn() {
  // Navigation
  document.getElementById("home-btn").innerText = "主页";
  document.getElementById("search-btn").innerText = "搜索";
  document.getElementById("saved-btn").innerText = "保存的餐馆";
  document.getElementById("login-btn").innerText = "登陆注册";

  // Search features
  if (document.getElementById("searchBtn")) {
    // Search bar
    document.getElementById("searchBtn").innerText = "搜索";
    document.getElementById("searchBar").setAttribute("placeholder", "搜索");
    // Filters
    document.getElementById("filterDesc").innerText = "餐厅分类";
    document.getElementById("foodLabel").innerText = "食物品质";
    document.getElementById("valueLabel").innerText = "食物价值";
    document.getElementById("serviceLabel").innerText = "快速服务";
    document.getElementById("languageLabel").innerText = "不需要英文帮助";
  }

  // Search results and metrics
  if (document.getElementById('resultsPlaceholder')) {
    // Search results message
    let resultMsg = document.getElementById("resultsPlaceholder").firstChild;
    // Make sure to get both singular and plural
    if (resultMsg.innerText.includes('results')) {
      resultMsg.innerText = resultMsg.innerText.replace('results', '个搜索结果');
    } else if (resultMsg.innerText.includes('result')) {
      resultMsg.innerText = resultMsg.innerText.replace('result', '个搜索结果');
    }
    // Translates the no results statement
    if (resultMsg.innerText.includes('Nothing found.')) {
      resultMsg.innerText = resultMsg.innerText.replace('Nothing found.', '这里没什么可看的');
    }
    
    // Metrics
    let results = document.querySelector("#resultsPlaceholder");
    // Metrics : Food Quality
    let quality = results.querySelectorAll('li[id^="restFood"]');
    quality.forEach((element, index) => {
      element.innerText = element.innerText.replace("Food Quality:", "食物品质 :");;
    });
    // Metrics : Food Value
    let value = results.querySelectorAll('li[id^="restValue"]');
    value.forEach((element, index) => {
      element.innerText = element.innerText.replace("Value:", "食物价值 :");
    });
    // Metrics : Service
    let service = results.querySelectorAll('li[id^="restService"]');
    service.forEach((element, index) => {
      element.innerText = element.innerText.replace("Service:", "快速服务 :");
    });
    // Metrics : Language
    let languageInd = results.querySelectorAll('li[id^="restLanguage"]');
    languageInd.forEach((element, index) => {
      element.innerText = element.innerText.replace("Little English Needed:", "不需要英文帮助 :");
    });
    // Metrics : Recent Reviews
    let recentRev = results.querySelectorAll('li[id^="restRecentReviews"]');
    recentRev.forEach((element, index) => {
      element.innerText = element.innerText.replace("Recent Reviews:", "最新评论 :");
    });
    // Other : Website
    let website = results.querySelectorAll('a[id^="restWebsite"]');
    website.forEach((element, index) => {
      element.innerText = element.innerText.replace("Website", "网站");
    });
    // Other : Menu
    let menu = results.querySelectorAll('a[id^="restMenu"]');
    menu.forEach((element, index) => {
      element.innerText = element.innerText.replace("Menu", "菜单");
    });
  }

  // Saved List page
  if (document.getElementById("welcomeMsg")) {
    document.getElementById("welcomeMsg").innerText = "欢迎";
    // document.getElementById("listHeading").innerText = "你保存的餐厅";
    document.getElementById("pills-saves-tab").innerText = "你保存的餐厅";
    document.getElementById("pills-language-tab").innerText = "你的语言";
    document.getElementById("langOptionsHeading").innerText = "改变语言 :";
  }

  // Restaurants page
  if (document.getElementById("address")) {
    document.getElementById("address").innerText = "地址";
    document.getElementById("hours").innerText = "营业时间";
    document.getElementById("website").innerText = "网站";
    document.getElementById("phone").innerText = "电话号码";
    document.getElementById("ratings").innerText = "评分";
    let hoursContent = document.getElementById("rest-hours-placeholder");
    hoursContent.innerText = hoursContent.innerText.replace("7 days a week", "每天");

    let ratings = document.getElementById("rest-ratings-content");
    ratings.innerHTML = ratings.innerHTML.replace("Food Quality:", "食物品质 :");
    ratings.innerHTML= ratings.innerHTML.replace("Value:", "食物价值 :");
    ratings.innerHTML= ratings.innerHTML.replace("Service:", "快速服务 :");
    ratings.innerHTML= ratings.innerHTML.replace("Little English Needed:", "不需要英文帮助 :");
    ratings.innerHTML= ratings.innerHTML.replace("Recent Reviews:", "最新评论 :");
  }

  // Review form
  if (document.getElementById("reviewForm")) {
    document.getElementById("reviewButton").innerHTML = "评价餐厅";
    document.querySelector("#submitButton button").innerHTML = "确认";
    let cardTitle = document.querySelectorAll(".card-title");
    cardTitle.forEach((element, index) => {
      element.innerHTML = element.innerHTML.replace("Food Quality", "食物品质");
      element.innerHTML = element.innerHTML.replace("Value", "食物价值");
      element.innerHTML = element.innerHTML.replace("Service", "快速服务");
      element.innerHTML = element.innerHTML.replace("Little English Needed", "不需要英文帮助");
    });
  }

  // Log in modal
  // Should check if the login modal is visible
  if (document.getElementById("loginModalLabel")) {
    document.getElementById("loginModalLabel").innerText = "你好！";
    document.getElementById("loginModalMsg").innerText = "请登录";
    document.getElementById("modalClose").innerText = "不用了，谢谢";
    document.getElementById("loginModalBtn").innerText = "登陆";
  }

  // Log in page
  if (document.getElementById("loginHeading")) {
    document.getElementById("loginHeading").innerText = "登陆注册";
    document.getElementById("loader").innerText = "加载中...";
  }
  
}



// Translate back to English in sections
function translateToEng() {
  // Navigation
  document.getElementById("home-btn").innerText = "Home";
  document.getElementById("search-btn").innerText = "Search";
  document.getElementById("saved-btn").innerText = "Saved list";
  document.getElementById("login-btn").innerText = "Log in";

  // Search features
  if (document.getElementById("searchBtn")) {
    // Search bar
    document.getElementById("searchBtn").innerText = "Search";
    document.getElementById("searchBar").setAttribute("placeholder", "Search");
    // Filters
    document.getElementById("filterDesc").innerText = "Filter restaurants by:";
    document.getElementById("foodLabel").innerText = "Food Quality";
    document.getElementById("valueLabel").innerText = "Value";
    document.getElementById("serviceLabel").innerText = "Service";
    document.getElementById("languageLabel").innerText = "Little English needed";
  }

  // Search results and metrics
  if (document.getElementById('resultsPlaceholder')) {
    // Search results message
    let resultMsg = document.getElementById("resultsPlaceholder").firstChild;
    // Make sure to get both singular and plural
    if (resultMsg.innerText.includes('个搜索结果')) {
      // If the results return 1, make "result" singular
      if (document.getElementById('resultsPlaceholder').childNodes < 3) {
        resultMsg.innerText = resultMsg.innerText.replace('个搜索结果', 'result');
      } else {
        resultMsg.innerText = resultMsg.innerText.replace('个搜索结果', 'results');
      }
    }
    // Translates the no results statement
    if (resultMsg.innerText.includes('这里没什么可看的')) {
      resultMsg.innerText = resultMsg.innerText.replace('这里没什么可看的', 'Nothing found.');
    }
    
    // Metrics
    let results = document.querySelector("#resultsPlaceholder");
    // Metrics : Food Quality
    let quality = results.querySelectorAll('li[id^="restFood"]');
    quality.forEach((element, index) => {
      element.innerText = element.innerText.replace("食物品质 :", "Food Quality:");
    });
    // Metrics : Food Value
    let value = results.querySelectorAll('li[id^="restValue"]');
    value.forEach((element, index) => {
      element.innerText = element.innerText.replace("食物价值 :", "Value:");
    });
    // Metrics : Service
    let service = results.querySelectorAll('li[id^="restService"]');
    service.forEach((element, index) => {
      element.innerText = element.innerText.replace("快速服务 :", "Service:");
    });
    // Metrics : Language
    let languageInd = results.querySelectorAll('li[id^="restLanguage"]');
    languageInd.forEach((element, index) => {
      element.innerText = element.innerText.replace("不需要英文帮助 :", "Little English Needed:");
    });
    // Metrics : Recent Reviews
    let recentRev = results.querySelectorAll('li[id^="restRecentReviews"]');
    recentRev.forEach((element, index) => {
      element.innerText = element.innerText.replace("最新评论 :", "Recent Reviews:");
    });
    // Other : Website
    let website = results.querySelectorAll('a[id^="restWebsite"]');
    website.forEach((element, index) => {
      element.innerText = element.innerText.replace("网站", "Website");
    });
    // Other : Menu
    let menu = results.querySelectorAll('a[id^="restMenu"]');
    menu.forEach((element, index) => {
      element.innerText = element.innerText.replace("菜单", "Menu");
    });
  }

  // Saved List page
  if (document.getElementById("welcomeMsg")) {
    document.getElementById("welcomeMsg").innerText = "Welcome";
    // document.getElementById("listHeading").innerText = "Your saved restaurants";
    document.getElementById("pills-saves-tab").innerText = "Your Saved List";
    document.getElementById("pills-language-tab").innerText = "Your Language";
    document.getElementById("langOptionsHeading").innerText = "Change language:";
  }

  // Restaurants page
  if (document.getElementById("address")) {
    document.getElementById("address").innerText = "Address";
    document.getElementById("hours").innerText = "Hours";
    document.getElementById("website").innerText = "Website";
    document.getElementById("phone").innerText = "Phone";
    document.getElementById("ratings").innerText = "Ratings";

    let hoursContent = document.getElementById("rest-hours-placeholder");
    hoursContent.innerText = hoursContent.innerText.replace("每天", "7 days a week");

    let ratings = document.getElementById("rest-ratings-content");
    ratings.innerHTML = ratings.innerHTML.replace("食物品质 :", "Food Quality:");
    ratings.innerHTML= ratings.innerHTML.replace("食物价值 :", "Value:");
    ratings.innerHTML= ratings.innerHTML.replace("快速服务 :", "Service:");
    ratings.innerHTML= ratings.innerHTML.replace("不需要英文帮助 :", "Little English Needed:");
    ratings.innerHTML= ratings.innerHTML.replace("最新评论 :", "Recent Reviews:");
  }

  // Review form
  if (document.getElementById("reviewForm")) {
    document.getElementById("reviewButton").innerHTML = "Leavea a review!";
    document.querySelector("#submitButton button").innerHTML = "Submit";
    let cardTitle = document.querySelectorAll(".card-title");
    cardTitle.forEach((element, index) => {
      element.innerHTML = element.innerHTML.replace("食物品质", "Food Quality");
      element.innerHTML = element.innerHTML.replace("食物价值", "Value");
      element.innerHTML = element.innerHTML.replace("快速服务", "Service");
      element.innerHTML = element.innerHTML.replace("不需要英文帮助", "Little English Needed");
    });
  }

  // Log in modal
  // Should check if the login modal is visible
  if (document.getElementById("loginModalLabel")) {
    document.getElementById("loginModalLabel").innerText = "Hello!";
    document.getElementById("loginModalMsg").innerText = "Please log in";
    document.getElementById("modalClose").innerText = "No, thanks";
    document.getElementById("loginModalBtn").innerText = "Log in";
  }

  // Log in page
  if (document.getElementById("loginHeading")) {
    document.getElementById("loginHeading").innerText = "Log in";
    document.getElementById("loader").innerText = "Loading...";
  }
  
}
