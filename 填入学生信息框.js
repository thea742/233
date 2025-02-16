var li_3 = document.querySelector("#li-3");
var infill_student = document.querySelector("#infill_student");
var infill_student_close = document.querySelector("#infill_student_close");
var infill_input_save = document.querySelector("#infill_input_save");

li_3.addEventListener('click', function() {             //打开填表
	mask.style.display = 'block';
	infill_student.style.display = 'block';
})

infill_student_close.addEventListener('click', function() {      //控制页面的开和关
		mask.style.display = 'none';
		infill_student.style.display = 'none';
	})
	
infill_input_save.addEventListener("click",function(){
		mask.style.display = 'none';
		infill_student.style.display = "none";
})

infill_seat_title.addEventListener('mousedown', function(e) {         //鼠标可以移动表格
	var x_1 = e.pageX - infill_student.offsetLeft;
	var y_1 = e.pageY - infill_student.offsetTop;

	document.addEventListener('mousemove', move)

	function move(e) {
		infill_student.style.left = e.pageX - x_1 + 'px';
		infill_student.style.top = e.pageY - y_1 + 'px';
	}
	document.addEventListener('mouseup', function() {
		document.removeEventListener('mousemove', move);
	})
})

//--------------------------------------------------------------------------------------------出现动态表格以填入学生信息

var infill_input_btn = document.querySelector("#infill_input_confirm");
var student_num = document.getElementById("student_num");
var tbody = document.querySelector("tbody");
var tbody_num = 0;
var newNode_tr = null;
var newNode_td_1 = null;
var newNode_td_2 = null;
var student_num_value = student_num.value;

function table_box(){                //用户输入学生个数，动态出现表格函数
	for(var j=0; j<tbody_num;j++)
	{
		tbody.deleteRow(i);
	}
	tbody_num = 0;
	for(var i=1; i<=student_num.value; i++){
	            newNode_tr = document.createElement("tr");
				newNode_td_1 = document.createElement("td");
				newNode_td_2 = document.createElement("td");
				newNode_input = document.createElement("input");
				newNode_td_1.innerText = i;
				newNode_td_2.appendChild(newNode_input);
				newNode_tr.appendChild(newNode_td_1);
				newNode_tr.appendChild(newNode_td_2);
				tbody.appendChild(newNode_tr);
	}
	tbody_num = student_num.value;
	student_num_value = student_num.value;
}

infill_input_btn.addEventListener("click",function(){
	console.log(student_num_value)
	if(student_num_value == "")
	{
		table_box();
	}else{
		if(window.confirm("您确定要更改学生人数吗？更改人数将导致您原有的数据消失"))
		{
			table_box();
		}
	}
})

var student_name = [];
document.addEventListener("paste", e => {  //获取学生的姓名并打印在input框里
    e.preventDefault(); //阻止默认粘贴事件
    e.stopPropagation(); //阻止事件冒泡
    let paste = (e.clipboardData || window.clipboardData).getData("text"); //以text方式接收粘贴内容
    student_name = paste.split("\r\n");
    console.log("学生名字:",student_name)
	for(var i=0; i<student_name.length-1; i++)
	{
		var infill_input_total = document.querySelectorAll("tbody input");
		infill_input_total[i].value = student_name[i];
	}
})

//-------------------------------------------------------------------------------------------------------创造座位布局

var newNode_div = null;
var newNode_li = null;
var number_line = 0;
var number_li = 0;
var total_seat = document.querySelector("#total-seat");
var seat_rules = document.getElementById("seat_rules"); //两人一桌 or 三人一桌
var seat_zu = document.getElementById("seat_zu"); //组数
var seat_lines = document.getElementById("seat_lines"); //总共有多少排
var infill_seat_confirm = document.querySelector("#infill_seat_confirm");
var p_seat_num = document.querySelector("#p_seat_num");

infill_seat_confirm.addEventListener("click",function(){  //点击确定按钮动态生成座位
	count_first = seat_zu.value * seat_rules.value * seat_lines.value;
	count_second = seat_zu.value * seat_rules.value * seat_lines.value;
	p_seat_num.innerHTML = count_first;
	
		if(number_line !== 0)         //先删除整个元素内的孩子
		{
			for(var i=0; i<number_line; i++)
			{
				total_seat.removeChild(total_seat.children[0]);
			}
		}
		
		var li_height = 87*1.0/seat_lines.value;                             //设置每一个 li 的高度
		if(li_height > 9)
		{
			li_height = 9;
		}
		for(var i=0; i<seat_lines.value; i++)       //创造一行一行的 div
		{
			if(seat_rules.value == 2 && seat_zu.value >= 10){
				alert("您输入的座位屏幕排不下")
				break;
			}
			newNode_div = document.createElement("div");
			number_line = i+1;
			newNode_div.id = "line-"+ number_line;
			total_seat.appendChild(newNode_div);
			
			for(var j=0; j<seat_zu.value*seat_rules.value; j++)     //把 li 放入一行一行的 div 里面
			{
				newNode_li = document.createElement("li");
				number_li = j+1;
				newNode_li.id ="line-"+number_line+"seat_li-"+ number_li;
				newNode_div.appendChild(newNode_li);
				
				var li_width = (90-2)*1.0/(seat_zu.value*seat_rules.value);     //设置每一个 li 的宽度1.3
				if(li_width > 6.34){
					li_width = (90-0.9)*1.0/14;
				}
				newNode_li.style.width = li_width+"%";
				// newNode_li.setAttribute("style","margin-right:"+li_width*1.0/10+"%");
				var lie_width = li_width*1.0/40;
				newNode_li.style["margin-right"] = lie_width+"%";
				if(lie_width >= 0.3)
				{
					lie_width = 0.3;
					newNode_li.style["margin-right"] = "0.3%";
				}
				
				if(number_li%seat_rules.value == 0 && number_li != seat_zu.value*seat_rules.value)  //设置组与组之间的间距
				{
					var zu_width = lie_width*7;
					if(zu_width >= 2)
					{
						zu_width = 2;
						newNode_li.setAttribute("style","margin-right: 2%");
					}
					if(zu_width<=1.5 && seat_zu.value <=5)
					{
						zu_width = 1.5;
						newNode_li.setAttribute("style","margin-right: 1.5%");
					}
					newNode_li.setAttribute("style","margin-right:"+zu_width+"%");
					newNode_li.style.width = li_width+"%";
				}
				
				if(number_li == seat_zu.value*seat_rules.value)  //设置最后一个li的右边距
				{
					newNode_li.setAttribute("style","margin-right: 0%");
					newNode_li.style.width = li_width+"%";
				}
				
			}  //整个li的模块（个数，宽度，间隔，组与组之间的间隔）
			var suan_side = [(100-li_width * seat_zu.value*seat_rules.value)-(seat_zu.value*seat_rules.value*lie_width)+lie_width-(seat_zu.value-1)*lie_width*11.5]*1.0/2;  //9.8
			// var suan_side = [(100-li_width * seat_zu.value*seat_rules.value)-(seat_zu.value*(seat_rules.value-1)*lie_width)-(seat_zu.value-1)*zu_width]*1.0/2;  //1.4
			if(seat_rules.value == 2){
				suan_side = suan_side;
			}
			if(seat_rules.value == 3){
				suan_side = [(100-li_width * seat_zu.value*seat_rules.value)-(seat_zu.value*seat_rules.value*lie_width)+lie_width-(seat_zu.value-1)*lie_width*12]*1.0/2;  //1.4
			}
			if(seat_rules.value == 4){
				suan_side = [(100-li_width * seat_zu.value*seat_rules.value)-(seat_zu.value*seat_rules.value*lie_width)+lie_width-(seat_zu.value-1)*lie_width*16]*1.0/2;  //1.4
			}
			var suan_top = (87-li_height*seat_lines.value-seat_lines.value*0.2)*1.0/2;  //有问题
			
			newNode_div.setAttribute("style","margin-left:"+suan_side+ "%");
			if(number_line == 1)
			{
				newNode_div.setAttribute("style","margin-top:"+suan_top+"%; margin-left:"+suan_side+ "%");
			}
			if(suan_top < 0)
			{
				newNode_div.setAttribute("style","margin-left:"+suan_side+"%;margin-top:"+li_height*0.07+"%");
			}
			newNode_div.style.height = li_height+"%";  //整个小div模块（li的高度，整个div在页面中的位置）
			
		}

//--------------------------------------------------------------------------------------------------------------------让座位消失或交换学生的名字

		var change_li = document.querySelectorAll("#total-seat div li");
		// console.log(change_li[0].clientHeight)
		for(var i=0; i<change_li.length; i++)
		{
			change_li[i].style["line-height"] = change_li[0].clientHeight+"px";
			change_li[i].style["font-size"] = change_li[0].clientHeight*1.0/2+"px";
		}
		console.log(total_seat)
		console.log(total_seat.children[0])
		// var isfirst_1 = 1;
		var box_content = [];
		var box_color = [];
		for(var i=0; i<change_li.length; i++)
		{
			change_li[i].addEventListener("click",function(){
				
				if(this.style.border == "0.13vw dashed silver")       //点击盒子删除或增加
				{
					console.log(1)
					this.style.border = "0.13vw solid aqua";
					this.style.backgroundColor = "white";
					count_first++;
					p_seat_num.innerHTML = count_first;
				}
				
				else if(this.innerHTML == '')
				{
					// this.style.visibility = "hidden";  //visibility
					if(this.style.border != "0.13vw dashed silver")
					{
						count_first--;
					}
					this.style.border = "0.13vw dashed silver";
					this.style.backgroundColor = "#fffae8";

					p_seat_num.innerHTML = count_first;
				}
				
				else if(this.innerHTML != '')           //点击盒子交换学生名字
				{
					box_color.push(this.style.backgroundColor);
					box_content.push(this.innerHTML);
					this.setAttribute("class","li_color");
					this.style.backgroundColor = "yellow";
					// console.log(box_content)
					if(box_content.length == 2)
					{
						for(var j=0; j<change_li.length; j++)
						{
							var li_color = change_li[j].getAttribute("class");
							// console.log(li_color)
							if(li_color == "li_color")
							{
								// console.log(11)
								// console.log(this.innerHTML)
								if(change_li[j].innerHTML == box_content[0])
								{
									change_li[j].innerHTML = box_content[1];
									change_li[j].style.backgroundColor = box_color[1];
								}else{
									change_li[j].innerHTML = box_content[0];
									change_li[j].style.backgroundColor = box_color[0];
								}
									change_li[j].setAttribute("class","");
									// change_li[j].style.backgroundColor = "white";
							}
						}
						box_content.splice(0,box_content.length);
						box_color.splice(0,box_color.length);
					}
				}
			})
		}
})

//-------------------------------------------------------------------------------------------------------------------------当有名字在座位上时，让座位根据性别变颜色

var bian_color = document.querySelector("#bian_color");
var girl_num = document.querySelector("#girl_num");
bian_color.addEventListener("click",function(){           //改变座位颜色，让老师方便换位置
	var infill_input_total = document.querySelectorAll("tbody input");
	for(i = 0;i<infill_input_total.length;i++)
	{
		student_name[i] = infill_input_total[i].value;
	}
	
	if(student_num_value == "" || student_name.length == 0 || girl_num.value == "")
	{
		alert("您的学生信息表未填写完整")
	}
	else if(bian_color.innerHTML == "取消")
	{
		var change_li = document.querySelectorAll("#total-seat div li");
		for(var i=0; i<change_li.length; i++)
		{
			if(change_li[i].style.border != "0.13vw dashed silver")
			{
				change_li[i].style.backgroundColor = "white";
			}
		}
		bian_color.innerHTML = "变颜色";
	}
	else
	{
		bian_color.innerHTML = "取消";
		var change_li = document.querySelectorAll("#total-seat div li");
		for(var i=0; i<change_li.length; i++)
		{
			for(var j=0; j<girl_num.value; j++)
			{
				if(change_li[i].innerHTML == student_name[j])
				{
					change_li[i].style.backgroundColor = "lightpink";
				}
			}
			if(change_li[i].style.backgroundColor != "lightpink" && change_li[i].style.border != "0.13vw dashed silver")
			{
				change_li[i].style.backgroundColor = "cyan";
			}
		}
		
		
			change_btn.addEventListener("click",function(){
				if(bian_color.innerHTML == "取消")
				{
					var change_li = document.querySelectorAll("#total-seat div li");
					for(var i=0; i<change_li.length; i++)
					{
						if(change_li[i].style.border != "0.13vw dashed silver")
						{
							change_li[i].style.backgroundColor = "white";
						}
					}
					
					for(var i=0; i<change_li.length; i++)
					{
						for(var j=0; j<girl_num.value; j++)
						{
							if(change_li[i].innerHTML == student_name[j])
							{
								change_li[i].style.backgroundColor = "lightpink";
							}
						}
						if(change_li[i].style.backgroundColor != "lightpink" && change_li[i].style.border != "0.13vw dashed silver")
						{
							change_li[i].style.backgroundColor = "cyan";
						}
					}
				}
			})
		

	}

})

//--------------------------------------------------------------------------------------------------------------------------------------------------男女分坐

var sex_fen = document.querySelector("#sex_fen");
var arry_1 = [];
var arry_girl = [0];
var arry_girl_name = [];
var arry_boy = [0];
var arry_boy_name = [];
var count_third = 0;
var count_fourth = 0;
var num_1 = 0;
sex_fen.addEventListener("click",function(){
	var infill_input_total = document.querySelectorAll("tbody input");
	for(i = 0;i<infill_input_total.length;i++)
	{
		student_name[i] = infill_input_total[i].value;
	}
	
	if(student_num_value == "" || student_name.length == 0 || girl_num.value == "" || student_name.length-1 != student_num_value || count_first != student_num_value)
	{
		alert("您的学生信息表未填写完整")
	}
	else if(seat_rules.value != 2)
	{
		alert("该功能只支持两人一桌")
	}
	else
	{
		var change_li = document.querySelectorAll("#total-seat div li");
		
		if(sex_fen.innerHTML=="男女分坐")
		{
			var change_li = document.querySelectorAll("#total-seat div li");
			timer=setInterval(function(){         //计时器

				for(var i=1; i<=girl_num.value; i++)    //随机获取女生的学号
				{
					let num = getRandom(1,girl_num.value);
					if(arry_girl.indexOf(num)==-1){
						arry_girl.push(num);
					}else{
						i--;
					}
				}
				for(var j=1; j<=girl_num.value; j++)   //通过女生学号随机获取女生名字，用一个数组收集
				{
					arry_girl_name.push(student_name[arry_girl[j]-1]);
				}
				
				var student_name_boy = student_name.slice(girl_num.value,student_name.length-1);   //把男生的名字截取出来
				for(var i=1; i<=student_name_boy.length; i++)
				{
					let num = getRandom(1,student_name_boy.length);
					if(arry_boy.indexOf(num)==-1){
						arry_boy.push(num);
					}else{
						i--;
					}
				}
				for(var j=1; j<=arry_boy.length; j++)   //获取随机排序的男生名字的数组
				{
					arry_boy_name.push(student_name_boy[arry_boy[j]-1]);
				}                
				arry_boy_name.pop();
				
				// console.log(arry_boy)
				
				console.log(arry_boy_name)
				console.log(arry_girl_name)
				
				var change_li = document.querySelectorAll("#total-seat div li");
				for(var i=0; i<change_li.length; i++)
				{
					num_1 = getRandom(0,change_li.length-1);    //获取随机数，这个随机数用来展示女生座位应该变成粉红色
					// console.log(num_1)
					if(arry_1.indexOf(num_1) == -1 && change_li[num_1].style.border != "0.13vw dashed silver")
					{
						arry_1.push(num_1);
						if((num_1+1) % 2 == 0)   //判断座位是否在右边（从讲台看）
						{
							// console.log(num_1)
							if(arry_1.length == girl_num.value)
							{
								break;
							}
							if(change_li[num_1-1].style.border != "0.13vw dashed silver")
							{
								arry_1.push(num_1 - 1);
							}
							if(change_li[num_1-1].style.border == "0.13vw dashed silver")
							{
								arry_1.pop();
							}
						}
						
						if((num_1+1) % 2 != 0)   //判断座位是否在左边（从讲台看）
						{
							// console.log(num_1)
							if(arry_1.length == girl_num.value)
							{
								break;
							}
							if(change_li[num_1+1].style.border != "0.13vw dashed silver")
							{
								arry_1.push(num_1 + 1);
							}
							if(change_li[num_1+1].style.border == "0.13vw dashed silver")
							{
								arry_1.pop();
							}
						}
						
						if(arry_1.length == girl_num.value)    //如果数组的长度等于女生的个数，退出循环
						{
							break;
						}
					}
				}

				
				for(var j=0; j<change_li.length; j++)     //把所有格子里面的颜色清除
				{
					if(change_li[j].style.border != "0.13vw dashed silver")
					{
						change_li[j].style.backgroundColor = "white";
					}
				}
				
				for(var i=0; i<girl_num.value; i++)           //让女生的位置变为粉红色
				{
					var change_li = document.querySelectorAll("#total-seat div li");
					change_li[arry_1[i]].style.backgroundColor = "lightpink";
				}       
				
				
				for(var i=0; i<change_li.length; i++)     //先把所有的格子里面的名字删掉
				{
					var change_li = document.querySelectorAll("#total-seat div li");
					change_li[i].innerHTML = "";
				}
				
				for(var i=0; i<change_li.length; i++)    //把女生的名字放进盒子里
				{
					var change_li = document.querySelectorAll("#total-seat div li");
					if(change_li[i].style.backgroundColor == "lightpink")
					{
						change_li[i].innerHTML = arry_girl_name[count_third];
						count_third++;
					}
				}
				
				for(var i=0; i<change_li.length; i++)    //把男生的名字放进盒子里
				{
					var change_li = document.querySelectorAll("#total-seat div li");
					if(change_li[i].style.backgroundColor != "lightpink" && change_li[i].style.border != "0.13vw dashed silver")
					{
						change_li[i].innerHTML = arry_boy_name[count_fourth];
						change_li[i].style.backgroundColor = "aqua";
						count_fourth++;
					}
				}
				
				
				count_fourth = 0;    //清空所有的变量
				count_third = 0;
				arry_1.splice(0,arry_1.length);
				arry_girl.splice(1,arry_girl.length-1);
				arry_boy.splice(1,arry_boy.length-1);
				arry_girl_name.splice(0,arry_girl_name.length);
				arry_boy_name.splice(0,arry_boy_name.length);
				timerun_1++;
				if(timerun_1 === 5)
				{
					clearInterval(timer);
					sex_fen.innerHTML="男女分坐";
					timerun_1 = 0;
				}
				
				},100);
			sex_fen.innerHTML="OUT";
		}
		else if(sex_fen.innerHTML == "OUT"){
			sex_fen.innerHTML="男女分坐"; 
			clearInterval(timer);
			timerun_1 = 0;
		}
	}
})