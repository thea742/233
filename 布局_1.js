var change_btn = document.getElementById("btn");
var count_first = 0;
var count_second = 0;
var timer=null;
var arry=[0];
var timerun_1 = 0;

function getRandom(min, max)   //获取随机数的函数
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

change_btn.onclick = function(){
	// console.log(count)
	var change_li = document.querySelectorAll("#total-seat div li");
	for(var j=0; j<change_li.length; j++)     //把所有格子里面的颜色清除
	{
		if(change_li[j].style.border != "0.13vw dashed silver")
		{
			change_li[j].style.backgroundColor = "white";
		}
	}
	
	if(student_name.length-1 == student_num_value && count_first == student_num_value)  //填入了学生的名字
	{
		if(change_btn.innerHTML=="BEGIN")
		{
			timer=setInterval(function(){         //计时器
			for(var i=1;i<=count_first;i++)
			{
				let num = getRandom(1, count_first);    //建立一个数组获取不重复的随机数
				if(arry.indexOf(num)==-1){
					arry.push(num);
				}else{
					i--;
				}
			}
			
			var i_wei_first = 0;
			for(var i=1;i<=count_second;i++)
			{
				if(change_li[i-1].style.border == "0.13vw dashed silver")
				{
					continue;
				}
				i_wei_first++;
				change_li[i-1].innerHTML = arry[i_wei_first];
				change_li[i-1].innerHTML = student_name[change_li[i-1].innerHTML-1];
				// console.log(arry)
			}
			timerun_1++;
			if(timerun_1 === 5)
			{
				clearInterval(timer);
				change_btn.innerHTML="BEGIN";
				timerun_1 = 0;
			}
			arry.splice(1,arry.length-1)},100);  //清空数组
			change_btn.innerHTML="OUT";
		}
		else if(change_btn.innerHTML == "OUT"){
			change_btn.innerHTML="BEGIN"; 
			clearInterval(timer);
			timerun_1 = 0;
		}
	}
	
	else if(student_num_value == "")
	{
		if(change_btn.innerHTML=="BEGIN")
		{
			timer=setInterval(function(){         //计时器
			for(var i=1;i<=count_first;i++)
			{
				let num = getRandom(1, count_first);    //建立一个数组获取不重复的随机数
				if(arry.indexOf(num)==-1){
					arry.push(num);
				}else{
					i--;
				}
			}
			var i_wei_second = 0;
			for(var i=1;i<=count_second;i++)
			{
				// console.log(change_li[i-1].style.visibility)
				if(change_li[i-1].style.border == "0.13vw dashed silver")
				{
					continue;
				}
				i_wei_second++;
				change_li[i-1].innerHTML = arry[i_wei_second];
				// console.log(arry)
			}
			timerun_1++;
			if(timerun_1 === 5)
			{
				clearInterval(timer);
				change_btn.innerHTML="BEGIN";
				timerun_1 = 0;
			}
			arry.splice(1,arry.length-1)},100);   //清空数组
			change_btn.innerHTML="OUT";
		}
		else if(change_btn.innerHTML == "OUT"){
			change_btn.innerHTML="BEGIN"; 
			clearInterval(timer);
			timerun_1 = 0;
		}
	}
	
	else
	{
			alert("您的学生信息未填写完整 或 与所安排的位置个数不相符")
	}
}

//--------------------------------------------------------------导航栏的设计

var nav = document.querySelector(".nav");
var nav_li = document.querySelectorAll(".nav li");
var xiao_nav = document.querySelector("#xiao_nav");
var xiao_nav_li = document.querySelectorAll("#xiao_nav li");
var li_4 = document.querySelector("#li-4");
var mosheng = document.querySelector("#MoSheng");

for(var i=0; i<nav_li.length; i++)  //导航栏的字体设计
{
	nav_li[i].style["line-height"] = nav.clientHeight+"px";
	nav_li[i].style["font-size"] = nav.clientHeight*1.0/2.5+"px";
}

li_4.addEventListener("click",function(){
	if(xiao_nav.style.display == "block"){
		xiao_nav.style.display = "none";
	}else{
		xiao_nav.style.display = "block";
	}
	for(var i=0; i<xiao_nav_li.length; i++)   //字体设计
	{
		xiao_nav_li[i].style["line-height"] = xiao_nav_li[0].clientHeight+"px";
		xiao_nav_li[i].style["font-size"] = xiao_nav_li[0].clientHeight*1.0/2.3+"px";
	}
})
// document.body.addEventListener("click",function(){
// 	if(xiao_nav.style.display == "block"){
// 		xiao_nav.style.display = "none";
// 	}
// },true)

// li_4.addEventListener("mouseover",function(){   这是另外一种方法
// 	xiao_nav.style.display = "block";
// 	for(var i=0; i<xiao_nav_li.length; i++)
// 	{
// 		xiao_nav_li[i].style["line-height"] = xiao_nav_li[0].clientHeight+"px";
// 		xiao_nav_li[i].style["font-size"] = xiao_nav_li[0].clientHeight*1.0/2.3+"px";
// 	}
// })
// li_4.addEventListener("mouseout",function(){
// 	xiao_nav.style.display = "none";
// })

//倒转页面
var platform_position = document.querySelector("#platform");
var platform_seat_num_position = document.querySelector("#platform_seat_num");
var Reverse = document.querySelector("#reverse");
var total_seat = document.querySelector("#total-seat");
var index_reverse = 0;
var index_mosheng = 0;
Reverse.addEventListener("click",function(){
	index_mosheng = 1;
	if(index_reverse == 0)
	{
		platform_position.style.removeProperty("bottom");
		platform_position.style.top = "0.55%";
		
		platform_seat_num_position.style.display = "none";
		
		mosheng.style.removeProperty("bottom");
		mosheng.style.top = "0.55%";
		
		total_seat.style.top = "11%";
		
		nav.style.removeProperty("bottom");
		xiao_nav.style.removeProperty("bottom");
		nav.style.top = "2%";
		xiao_nav.style.top = "9%";
		
		Reverse.innerHTML = "恢复";
		index_reverse = 1;
	}
	else{
		platform_position.style.removeProperty("top");
		platform_position.style.bottom = "0.55%";
		
		platform_seat_num_position.style.display = "block";
		
		mosheng.style.removeProperty("top");
		mosheng.style.bottom = "0.55%";
		
		total_seat.style.removeProperty("top");
		
		nav.style.removeProperty("top");
		xiao_nav.style.removeProperty("top");
		nav.style.bottom = "2%";
		xiao_nav.style.bottom = "9%";
		
		Reverse.innerHTML = "倒转";
		index_reverse = 0;
	}
})

mosheng.addEventListener("click",function(){
	if(xiao_nav.style.display == "block")
	{
		xiao_nav.style.display = "none";
	}

	// if(index_mosheng == 1)  //把原来的css去掉，用js的动画去做
	// {
	// 	if(nav.style.display == "block"){
	// 		nav.style.display = "none";
	// 	}
	// 	if(xiao_nav.style.display == "block"){
	// 		xiao_nav.style.display = "none";
	// 	}
	// }
})