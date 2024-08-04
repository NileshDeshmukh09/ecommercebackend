## Getting Started


## Swagger Documentation

- Swagger is set up to document the API endpoints. You can access the Swagger UI at:
    ```
    https://ecommercebackend-mz55.onrender.com/

    ```
 ## Swagger Screenshot
![Screenshot (164)](https://github.com/NileshDeshmukh09/ecommercebackend/blob/master/screenshot/Screenshot%20(170).png)


### setup project in local



1. **Clone the repository**

   ``` 
   git clone https://github.com/NileshDeshmukh09/ecommercebackend.git
   ```

2. **Navigate to the project directory**

    ``` 
    cd ecommercebackend
     ```

3. **Install dependencies**

    ``` 
    npm install 
    ```

4. **Set up environment variables**

    Create a .env file in the root of your project and add the following environment variables:

    ```

    MONGODB_URI = `mongodb+srv://{username}:{password}@cluster0.fe4u7hr.mongodb.net/ecommerce-db?retryWrites=true&w=majority&appName=Cluster0`
    JWT_SECRET_KEY = `your-secret-key`


    ```

    Replace the values with your actual URLs as needed.

5. **Start the development server**
      
    ``` 
    npm start
    ```
   server will run on  ` http://localhost:8000/ `
   



## FEATURES COVERED : 

●  When the user logs in  the app should greet the user with a welcome message: "Welcome, <email-of-the-user>!”

● Improve the above application and add roles to it. A user can be a super admin
or a regular user.

● A super admin can manage a list of products.

● Each product will have an image, a title, a description, and a price attached to
it.

● Users (who are not super admins) can browse products and add it to a cart
after logging in.

● Users can add multiple products to the cart.

● Users can review the cart once items are added.

● Users can checkout the cart by providing a shipping address.

● Once the cart is checked out, the cart is cleared, and a success message is
shown.

● An email should be sent to the user after a successful cart checkout.


