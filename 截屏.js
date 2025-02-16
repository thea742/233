const screenshotBtn = document.querySelector("#li-1");
var screenshotPreview = document.querySelector(".src-preview");
var screenshot_close_btn = document.querySelector("#screenshot_close_btn");

function convertBase64ToBlob(imageEditorBase64) // base64转化为Blob对象
{
	var base64Arr = imageEditorBase64.split(",");
	var imgtype = "";
	var base64String = "";
	if (base64Arr.length > 1) {
	//如果是图片base64，去掉头信息
	base64String = base64Arr[1];
	imgtype = base64Arr[0].substring(
	  base64Arr[0].indexOf(":") + 1,
	  base64Arr[0].indexOf(";")
	);
	}
	var bytes = atob(base64String); // 将base64解码
	var bytesCode = new ArrayBuffer(bytes.length);
	var byteArray = new Uint8Array(bytesCode); // 转换为类型化数组
	for (var i = 0; i < bytes.length; i++) 
	{
	byteArray[i] = bytes.charCodeAt(i);      // 将base64转换为ascii码
	}

	return new Blob([bytesCode], { type: imgtype });      // 生成Blob对象（文件对象）
}
	

function downFileToLocal(fileName,blob)// 下载Blob流文件
{
	const d = document.createElement("a");
	d.style.display = "none";// 界面上隐藏该按钮
	document.body.appendChild(d);// 放到页面上
	
	d.href = window.URL.createObjectURL(blob);// 设置下载内容
	d.download = fileName;// 设置下载文件的名字

	d.click(); // 点击下载文件
	  
	document.body.removeChild(d);// 从页面移除掉
	window.URL.revokeObjectURL(d.href);// 释放 URL.createObjectURL() 创建的 URL 对象
}

const captureScreen = async () =>{
	try{
		const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab:true});
		const video = document.createElement("video");
		
		video.addEventListener("loadedmetadata",()=>{
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			
			video.play();
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			stream.getVideoTracks()[0].stop();
			
			screenshotPreview.querySelector("img").src = canvas.toDataURL();
			screenshotPreview.style.display = "block";
			
			var img_url = convertBase64ToBlob(canvas.toDataURL());//转成blob
			downFileToLocal("截图.jpg",img_url);//实现下载
		})
		
		video.srcObject = stream;
		nav.style.display = "block";
		}
	catch(error){
		alert("截图失败");
		nav.style.display = "block";
	}
}


screenshotBtn.addEventListener("click",function(){
	nav.style.display = "none";
	captureScreen();//调用函数
})

screenshot_close_btn.addEventListener("click",function(){//关闭截图展示
	screenshotPreview.style.display = "none";
})
