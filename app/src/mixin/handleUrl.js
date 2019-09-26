//处理图片url

export const handleUrl = {
    methods: {
        formatImgUrl(arr, cutTitle = false) {
            if (!Array.isArray(arr)) {
                return;
            }
            let newArr = [];
            arr.forEach(item => {
                let title = item.comingTitle;
                if (cutTitle) {
                    title = item.comingTitle.split(" ")[0];
                }
                let imgUrl = item.img.replace("w.h", "128.180");
                newArr.push({
                    ...item,
                    comingTitle: title,
                    img: imgUrl
                });
            });
            return newArr;
        }
    }
}
