// If user is logged in, get the language preference from their profile
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      console.log("Logged in");
      if (doc.data().language === "Cn") {
        translateToCn();
      }
    })
  } else {
    // Get the language setting from Local Storage if user is not logged in
    console.log(localStorage.getItem("Language"));
    if (localStorage.getItem("Language") === "Cn") {
      translateToCn();
      console.log("translating");
    }
  }
});


///////////////////////////////////////////////////
// Translate to Chinese simplified
// Check if the page has a particular section before translating
///////////////////////////////////////////////////
function translateToCn() {
  // Navigation
  document.getElementById("home-btn").innerText = "主页";
  document.getElementById("search-btn").innerText = "搜索";
  document.getElementById("saved-btn").innerText = "保存的餐馆";
  document.getElementById("login-btn").innerText = "登陆注册";

  // Search features, if exists on page
  if (document.getElementById("searchBtn")) {
    translateToCnSearch();
  }
  // Search results and metrics, if exists on page
  if (document.getElementById('resultsPlaceholder')) {
    translateToCnMetrics();
  }
  // Saved List page, if exists on page
  if (document.getElementById("welcomeMsg")) {
    translateToCnSaved();
  }
  // Restaurants page, if exists on page
  if (document.getElementById("address")) {
    translateToCnRestaurant();
  }
  // Review form, if exists on page
  if (document.getElementById("reviewForm")) {
    translateToCnReviewForm();
  }
  // Log in modal, if exists on page
  if (document.getElementById("loginModalLabel")) {
    translateToCnLoginModal();
  }
  // Log in page, if exists on page
  if (document.getElementById("loginHeading")) {
    translateToCnLoginPg();
  }
}

function translateToCnSearch() {
  // Search bar
  document.getElementById("searchBar").setAttribute("placeholder", "搜索");
  // Filters
  document.getElementById("filterDesc").innerText = "餐厅分类";
  document.getElementById("foodLabel").innerText = "食物品质";
  document.getElementById("valueLabel").innerText = "食物价值";
  document.getElementById("serviceLabel").innerText = "快速服务";
  document.getElementById("languageLabel").innerText = "不需要英文帮助";
}

function translateToCnMetrics() {
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
  results.querySelectorAll('li[id^="restFood"]').forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("Food Quality:", "食物品质 :");;
  });
  // Metrics : Food Value
  results.querySelectorAll('li[id^="restValue"]').forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("Value:", "食物价值 :");
  });
  // Metrics : Service
  results.querySelectorAll('li[id^="restService"]').forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("Service:", "快速服务 :");
  });
  // Metrics : Language
  results.querySelectorAll('li[id^="restLanguage"]').forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("Little English Needed:", "不需要英文帮助 :");
  });
  // Metrics : Recent Reviews
  results.querySelectorAll('li[id^="restRecentReviews"]').forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("Recent Reviews:", "最新评论 :");
  });
  // Other : Website
  results.querySelectorAll('a[id^="restWebsite"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("Website", "网站");
  });
  // Other : Menu
  results.querySelectorAll('a[id^="restMenu"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("Menu", "菜单");
  });
}

// Saved page to Cn
function translateToCnSaved() {
  document.getElementById("welcomeMsg").innerText = "欢迎";
  document.getElementById("pills-saves-tab").innerHTML = document.getElementById("pills-saves-tab").innerHTML.replace('Your Saved List', '你保存的餐厅');
  document.getElementById("pills-language-tab").innerHTML = document.getElementById("pills-language-tab").innerHTML.replace('Your Language', '你的语言');
  document.getElementById("langOptionsHeading").innerText = "改变语言 :";
}

// Restaurant page to Cn
function translateToCnRestaurant() {
  document.getElementById("address").innerHTML = document.getElementById("address").innerHTML.replace('Address', '地址');
  document.getElementById("hours").innerHTML = document.getElementById("hours").innerHTML.replace('Hours', '营业时间');
  let hoursContent = document.getElementById("rest-hours-placeholder");
  hoursContent.innerHTML = hoursContent.innerHTML.replace("7 Days a Week", "每天");
  document.getElementById("website").innerHTML = document.getElementById("website").innerHTML.replace('Website', '网站');
  document.getElementById("phone").innerHTML = document.getElementById("phone").innerHTML.replace('Phone', '电话号码');
  document.getElementById("ratings").innerHTML = document.getElementById("ratings").innerHTML.replace('Ratings', '评分');
  let ratings = document.getElementById("rest-ratings-content");
  ratings.innerHTML = ratings.innerHTML.replace("Food Quality:", "食物品质 :");
  ratings.innerHTML = ratings.innerHTML.replace("Value:", "食物价值 :");
  ratings.innerHTML = ratings.innerHTML.replace("Service:", "快速服务 :");
  ratings.innerHTML = ratings.innerHTML.replace("Little English Needed:", "不需要英文帮助 :");
  ratings.innerHTML = ratings.innerHTML.replace("Recent Reviews:", "最新评论 :");
}

function translateToCnReviewForm() {
  document.getElementById("reviewButton").innerHTML = document.getElementById("reviewButton").innerHTML.replace('Leave a review!', '评价餐厅');
  document.querySelector("#submitButton button").innerHTML = "确认";
  document.querySelectorAll(".card-title").forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("Food Quality", "食物品质");
    element.innerHTML = element.innerHTML.replace("Value", "食物价值");
    element.innerHTML = element.innerHTML.replace("Service", "快速服务");
    element.innerHTML = element.innerHTML.replace("Little English Needed", "不需要英文帮助");
  });
}

function translateToCnLoginModal() {
  document.getElementById("loginModalLabel").innerText = "你好！";
  document.getElementById("loginModalMsg").innerText = "请登录";
  document.getElementById("modalClose").innerText = "不用了，谢谢";
  document.getElementById("loginModalBtn").innerText = "登陆";
}

function translateToCnLoginPg() {
  document.getElementById("loginHeading").innerText = "登陆注册";
  document.getElementById("loader").innerText = "加载中...";
}

///////////////////////////////////////////////////
// Translate back to English in sections
// Check if the page has a particular section before translating
///////////////////////////////////////////////////
function translateToEng() {
  // Navigation
  document.getElementById("home-btn").innerText = "Home";
  document.getElementById("search-btn").innerText = "Search";
  document.getElementById("saved-btn").innerText = "Saved List";
  document.getElementById("login-btn").innerText = "Log in";

  // Search features, if exists on page
  if (document.getElementById("searchBtn")) {
    translateToEngSearch();
  }
  // Search results and metrics, if exists on page
  if (document.getElementById('resultsPlaceholder')) {
    translateToEngMetrics();
  }
  // Saved List page, if exists on page
  if (document.getElementById("welcomeMsg")) {
    translateToEngSaved();
  }
  // Restaurants page, if exists on page
  if (document.getElementById("address")) {
    translateToEngRestaurant();
  }
  // Review form, if exists on page
  if (document.getElementById("reviewForm")) {
    translateToEngReviewForm();
  }
  // Log in modal, if exists on page
  if (document.getElementById("loginModalLabel")) {
    translateToEngLoginModal();
  }
  // Log in page, if exists on page
  if (document.getElementById("loginHeading")) {
    translateToEngLoginPg();
  }

}

function translateToEngSearch() {
  // Search bar
  document.getElementById("searchBar").setAttribute("placeholder", "Search");
  // Filters
  document.getElementById("filterDesc").innerText = "Filter restaurants by:";
  document.getElementById("foodLabel").innerText = "Food Quality";
  document.getElementById("valueLabel").innerText = "Value";
  document.getElementById("serviceLabel").innerText = "Service";
  document.getElementById("languageLabel").innerText = "Little English needed";
}

function translateToEngMetrics() {
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
  results.querySelectorAll('li[id^="restFood"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("食物品质 :", "Food Quality:");
  });
  // Metrics : Food Value
  results.querySelectorAll('li[id^="restValue"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("食物价值 :", "Value:");
  });
  // Metrics : Service
  results.querySelectorAll('li[id^="restService"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("快速服务 :", "Service:");
  });
  // Metrics : Language
  results.querySelectorAll('li[id^="restLanguage"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("不需要英文帮助 :", "Little English Needed:");
  });
  // Metrics : Recent Reviews
  results.querySelectorAll('li[id^="restRecentReviews"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("最新评论 :", "Recent Reviews:");
  });
  // Other : Website
  results.querySelectorAll('a[id^="restWebsite"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("网站", "Website");
  });
  // Other : Menu
  results.querySelectorAll('a[id^="restMenu"]').forEach((element, index) => {
    element.innerText = element.innerText.replace("菜单", "Menu");
  });
}

function translateToEngSaved() {
  document.getElementById("welcomeMsg").innerText = "Welcome";
  document.getElementById("pills-saves-tab").innerHTML = document.getElementById("pills-saves-tab").innerHTML.replace('你保存的餐厅', 'Your Saved List');
  document.getElementById("pills-language-tab").innerHTML = document.getElementById("pills-language-tab").innerHTML.replace('你的语言', 'Your Language');
  document.getElementById("langOptionsHeading").innerText = "Change language:";
}

function translateToEngRestaurant() {
  document.getElementById("address").innerHTML = document.getElementById("address").innerHTML.replace('地址', 'Address');
  document.getElementById("hours").innerHTML = document.getElementById("hours").innerHTML.replace('营业时间', 'Hours');
  document.getElementById("website").innerHTML = document.getElementById("website").innerHTML.replace('网站', 'Website');
  document.getElementById("phone").innerHTML = document.getElementById("phone").innerHTML.replace('电话号码', 'Phone');
  document.getElementById("ratings").innerHTML = document.getElementById("ratings").innerHTML.replace('评分', 'Ratings');
  let hoursContent = document.getElementById("rest-hours-placeholder");
  hoursContent.innerHTML = hoursContent.innerHTML.replace("每天", "7 Days a Week");

  let ratings = document.getElementById("rest-ratings-content");
  ratings.innerHTML = ratings.innerHTML.replace("食物品质 :", "Food Quality:");
  ratings.innerHTML = ratings.innerHTML.replace("食物价值 :", "Value:");
  ratings.innerHTML = ratings.innerHTML.replace("快速服务 :", "Service:");
  ratings.innerHTML = ratings.innerHTML.replace("不需要英文帮助 :", "Little English Needed:");
  ratings.innerHTML = ratings.innerHTML.replace("最新评论 :", "Recent Reviews:");
}

function translateToEngReviewForm() {
  document.getElementById("reviewButton").innerHTML = document.getElementById("reviewButton").innerHTML.replace('评价餐厅', 'Leavea a review!');
  document.querySelector("#submitButton button").innerHTML = "Submit";
  document.querySelectorAll(".card-title").forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace("食物品质", "Food Quality");
    element.innerHTML = element.innerHTML.replace("食物价值", "Value");
    element.innerHTML = element.innerHTML.replace("快速服务", "Service");
    element.innerHTML = element.innerHTML.replace("不需要英文帮助", "Little English Needed");
  });
}

function translateToEngLoginModal() {
  document.getElementById("loginModalLabel").innerText = "Hello!";
  document.getElementById("loginModalMsg").innerText = "Please log in";
  document.getElementById("modalClose").innerText = "No, thanks";
  document.getElementById("loginModalBtn").innerText = "Log in";
}

function translateToEngLoginPg() {
  document.getElementById("loginHeading").innerText = "Log in";
  document.getElementById("loader").innerText = "Loading...";
}
