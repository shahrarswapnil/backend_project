const testing = require('../testing');
const db = require('../startup/db');

//grouping same kinda tests together
describe('absolute', ()=>{
    it('return positive for a positive',()=>{
        const value = testing.absolute(1);
        expect(value).toBe(1);
    });
    
    it('return positive for a negative',()=>{
        const value = testing.absolute(1);
        expect(value).toBe(1);
    });
    
    it('return 0 for a 0',()=>{
        const value = testing.absolute(0);
        expect(value).toBe(0);
    });
})

describe('greet', ()=>{
    it('return greeting',()=>{
        const value = testing.greet('Rifa');
        expect(value).toBe("Welcome Rifa");
        expect(value).toMatch(/Rifa/);//match pattern
        expect(value).toContain("Rifa");//contain pattern        
    });
    
})


describe('lists', ()=>{
    it('return a list',()=>{
        const value = testing.lists();
        //labh nai for array
        expect(value).toBeDefined();
        expect(value).not.toBeNull();

        //beshiee specific...inconsistent
        expect(value[0]).toBe('aata');
        expect(value[1]).toBe('moyda');
        expect(value[2]).toBe('shuji');
        expect(value.length).toBe(3);

        //ektu better
        expect(value).toContain('aata');//contain
        expect(value).toContain('moyda');//contain
        expect(value).toContain('shuji');//contain

        //proper
        expect(value).toEqual(expect.arrayContaining(['shuji','aata','moyda']));
        //contain kore naki arraytay oi jinish gula(order jai hok)??also array naki??
    });
    
})


//testing objects

describe('getProduct', ()=>{
    it('should match object',()=>{
        const value = testing.getProduct(1);
        //exact howa laage
        //expect(value).toEqual({id : 1, price: 20});
        //property match kore dekhe
        expect(value).toMatchObject({id : 1, price: 10});
        //property thakte hoy
        //expect(value).toHaveProperty('id','1');

        
    });
    
})

describe('regUser', ()=>{
    it('should throw if falsy object',()=>{
        // we expect a function to throw an error :3
        //So,
        const args = [null, undefined, 0, '', NaN, false];
        args.forEach(element => {
            expect(() => {
                testing.regUser(element)
            }).toThrow();    
        });
        
        
    });

    it('should return a user object if userName is valid',()=>{
        // we expect a function to throw an error :3
        //So,
        const result = testing.regUser('Shahrar');
        expect(result).toMatchObject({userName : 'Shahrar'});
        expect(result.id).toBeGreaterThan(0);
        
    });
    
})


describe('fizzbuzz', ()=>{
    it('should throw a type error if input is not a number',()=>{
        // we expect a function to throw an error :3
        //So,
        const args = [null, undefined, 'a', {}];
        args.forEach(element => {
            expect(() => {
                testing.fizzbuzz(element)
            }).toThrow();    
        });
        
        
    });

    it('should return FizzBuzz if input is divisible by 3 and 5',()=>{
        const result = testing.fizzbuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is divisible by 3',()=>{
        const result = testing.fizzbuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is divisible by 5',()=>{
        const result = testing.fizzbuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return input if input is not divisible by 3 or 5',()=>{
        const result = testing.fizzbuzz(8);
        expect(result).toBe(8);
    });
    
})

describe('applyDiscount', ()=>{
    it('should throw apply 10% discount',()=>{
        // we can make a fake function here :3
        //db.getCustomerSync = funtion(id){
        //     return ...;
        // }

        db.getCustomerSync = jest.fn().mockReturnValue({id: 1, points: 11});
        const order = {customerId:1,totalPrice:10};
        testing.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
        //mock functions.toHaveBeenCalled();
    });

})