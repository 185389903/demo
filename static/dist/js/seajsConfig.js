!function(){var a=document.getElementsByTagName("script"),t=a[0].getAttribute("src").split("?")[1];seajs.config({paths:{globalPath:"https://185389903.github.io/demo/static/dist/js"},alias:{jquery:"globalPath/libs/jquery/jquery.min",jqueryCookie:"globalPath/libs/jquery/jqueryCookie/jquery.cookie",main:"globalPath/main",index:"globalPath/index/index","index-alert":"globalPath/index/alert","index-nav":"globalPath/index/nav",news:"globalPath/news/news","news-alert":"globalPath/news/news-alert",about:"globalPath/about/about","about-alert":"globalPath/about/about-alert"},map:[[/^(.*\.(?:css|js))(.*)$/i,"$1?"+t]]})}();