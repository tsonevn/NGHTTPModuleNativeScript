import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {getJSON, getImage} from "http";
import {Page} from "ui/page";
import {Image} from "ui/image";
import {ObservableArray} from "data/observable-array"
import {Observable} from "data/observable";
import {ImageSource, fromUrl, fromFile} from "image-source";
import {setInterval} from "timer"; 


class DataItem {
    constructor(public id: number, public title: string, public datetime: Date, public imageSource:ImageSource) { }
}

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public source:ObservableArray<DataItem>;
    public counter:number = 2;
    public titlenumber:number = 2;
    public imagenumber:number = 1;
    constructor(private page:Page){
        var tmpImageSource:ImageSource=<ImageSource> fromFile("~/files/icon.png");

        this.source=new ObservableArray<DataItem>();
        var date = new Date();
        var imageSource:ImageSource = <ImageSource>fromFile("~/files/icon.png");
        this.source.push(new DataItem(1, "Title 1", date, imageSource));
        
    }


    ngOnInit(){
        var that = this;
        setInterval(function(){ 
            var randNumber:number = Math.floor(Math.random() * 3);
            var imageUrlArray:Array<string> = ["https://httpbin.org/image/png", "https://httpbin.org/image/jpeg", "https://httpbin.org/image/webp"];
            console.log(imageUrlArray[randNumber]);
            if(that.counter < 11){
                console.log(that.counter%2);
                switch (that.counter%2) {
                   
                    case 0:  
                        getImage(imageUrlArray[randNumber]).then(function (imageSource) {
                            
                            console.log("get image");
                            var date = new Date();
                            that.source.push(new DataItem(that.counter, "Image "+that.imagenumber, date, imageSource));
                            that.imagenumber++;
                        }, function (e) {
                            
                        });
                        break;
                    case 1:
                         getJSON("https://httpbin.org//cookies/set?title=Title"+that.titlenumber).then(function (r) {
                            console.log("result");
                            var date = new Date();
                            var imageSource:ImageSource = <ImageSource>fromFile("~/files/icon.png");
                            that.source.push(new DataItem(that.counter, r["cookies"]["title"], date, imageSource));
                            that.titlenumber++;
                        }, function (e) {
                            
                            console.log(e);
                        });
                        break;
                    default:

                        break;
                }
               
                

                
            }
            else{
                if(that.counter == 11){
                    alert("All items have been download");
                }
            }
            that.counter++;
        },1500)
    }
    

}