<?php

namespace App\Http\Controllers\API;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index () {
        $product = Product::all();
        return response()->json(['status'=>200, "products"=>$product]);
    }
    public function create (Request $request) {
        $validator = Validator::make($request->all(),[
            "name"=>"required", 
            "description"=>"required", 
            "price"=>"required",
            "inStock"=>"required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validate_err"=>$validator->errors()]);
        }
        else {
            $product = New Product();
            $product->name=$request->input('name');
            $product->description=$request->input('description');
            $product->price=$request->input('price');
            $product->inStock=$request->input('inStock');
            $product->save(); //query builder orm
            return response()->json(['status'=>200, 'message'=>'product addded succesfully']);
        }

    }
    
}
