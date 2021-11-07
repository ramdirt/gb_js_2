(function(){
	
	function Vehicle(model, averageSpeed, maxSpeed, type){
		this.type = type || 'транспорт';
		this.model = model || 'неизвестной модели';
		this.speed = 0;
		this.averageSpeed = averageSpeed || 0;
		this.maxSpeed = maxSpeed || 0;
	}
	
	Vehicle.prototype.getFullName = function(){
		return `${this.type} ${this.model}`;
	};
	
	Vehicle.prototype.getInfo = function(){
		console.log(`${this.getFullName()} передвигается со средней скоростью ${this.averageSpeed} км/ч, развивая максимальную скорость ${this.maxSpeed} км/ч`);
	};
	
	Vehicle.prototype.start = function(){
		this.speed+=10;
		console.log(`${this.getFullName()} начал движение`);
	};
	
	Vehicle.prototype.accelerate = function(speed){		
		this.speed = (this.speed + speed > this.maxSpeed) ? this.maxSpeed : this.speed + speed;	
		console.log(`${this.getFullName()} ускоряется до ${this.speed} км/ч`);
	};
	
	Vehicle.prototype.brake = function(){
		this.speed = 0;
		console.log(`${this.getFullName()} останавливается`);
	};
	
	function Car(model, averageSpeed, maxSpeed){
		Vehicle.apply(this, arguments);
		this.type = "автомобиль";
	};
	
	Car.prototype = Object.create(Vehicle.prototype);
	Car.prototype.constructor = Car;
	
	Car.prototype.start = function(){
		this.speed+=20;
		console.log(`${this.getFullName()} поехал`);
	};
	
	function Plane(model, averageSpeed, maxSpeed, height){
		Vehicle.apply(this, arguments);
		this.type = "самолёт";
		this.height = 0;
	};
	
	Plane.prototype = Object.create(Vehicle.prototype);
	Plane.prototype.constructor = Plane;
	
	Plane.prototype.start = function(){
		this.speed+=10;
		this.height+=5;
		console.log(`${this.getFullName()} взлетел`);
	};
	
	Plane.prototype.accelerate = function(speed){		
		this.speed = (this.speed + speed > this.maxSpeed) ? this.maxSpeed : this.speed + speed;
		this.height	= this.speed / 2; //вымышленная формула расчета высоты самолета от скорости 
		console.log(`${this.getFullName()} ускоряется до ${this.speed} км/ч и взлетает до ${this.height} км`);
	};
	
	Plane.prototype.brake = function(){
		this.speed = 0;
		console.log(`${this.getFullName()} приземляется`);
	};
	
	
	function Ship(model, averageSpeed, maxSpeed, height){
		Vehicle.apply(this, arguments);
		this.type = "корабль";
	};
	
	Ship.prototype = Object.create(Vehicle.prototype);
	Ship.prototype.constructor = Ship;
	
	Ship.prototype.start = function(){
		this.speed+=10;
		console.log(`${this.getFullName()} отчалился`);
	};
	
	//TODO: попробовать занести создание объектов в цикл	
	var car = new Car("BMW X5", 80, 200);
	car.getInfo();
	car.start();
	car.accelerate(50);
	car.accelerate(100);
	car.accelerate(100);
	car.brake();
	
	console.log('\n');
	
	var plane = new Plane("Super jet", 850, 1890);
	plane.getInfo();
	plane.start();
	plane.accelerate(50);
	plane.accelerate(100);
	plane.accelerate(100);
	plane.brake();
	
	console.log('\n');
	
	var ship = new Ship("Черная жемчужина", 80, 200);
	ship.getInfo();
	ship.start();
	ship.accelerate(50);
	ship.accelerate(100);
	ship.accelerate(100);
	ship.brake();
	
})()

