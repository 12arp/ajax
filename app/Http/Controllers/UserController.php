<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\City;
use App\Models\Country;
use App\Models\PermanentAddress;
use App\Models\User;
use App\Models\State;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    //register
    public function create(Request $request)
    {
        if ($request->isMethod('get')) {
            return view('register');
        }



        $validated = $request->validate([
            'fname' => 'required|string|max:50',
            'lname'  => 'required|string|max:50',
            'username'   => 'required|string|min:4|unique:users',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|string|min:5',
            'gender'     => 'required|in:male,female',
            'dob'        => 'date|before:' . now()->subYears(20),
            // 'phone' => 'required|phone:IN',
        ]);

        try {
            $imageFilename = null;
            
            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                
                // Generate unique filename to avoid conflicts
                $extension = $image->getClientOriginalExtension();
                $filename = time() . '_' . uniqid() . '.' . $extension;
                $imagePath = 'profile_images'; // Folder inside 'storage/app/public'

                // Store the file using Laravel's Storage facade
                // This automatically creates the directory if it doesn't exist
                $path = $image->storeAs("public/$imagePath", $filename);
                
                // Store the path relative to storage/app/public for database
                $imageFilename = "$imagePath/$filename";
            }

            $user = User::create([
                'first_name' => $validated['fname'],
                'last_name'  => $validated['lname'],
                'username'   => $validated['username'],
                'email'      => $validated['email'],
                'password'   => $validated['password'],
                'image'      => $imageFilename,
                'gender'     => $validated['gender'],
                'dob'        => $validated['dob'],
                'phone'      => $request->phone,

            ]);

            // dd($user->image);
            // if ($request->hasFile('image')) {



            //     $path = $request->file('image')->store('profiles', 'public');


            //     $user->update(['image' => $path]);
            // }


            // User::create(
            //     [
            //         'first_name' => $request->fname,
            //         'last_name'  => $request->lname,
            //         'username'   => $request->username,
            //         'email'      => $request->email,
            //         'password'   => $request->password,
            //         'gender'     => $request->gender,
            //         'dob'        => $request->dob,
            //         'phone'      => $request->phone,
            //     ]
            // );

            return response()->json([
                'status'  => 'success',
                'user_id' => $user->id,
                'message' => 'Registration successful!',
            ], 201);
        } catch (Exception $e) {


            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // login 
    public function login(Request $request)
    {

        if ($request->isMethod('post')) {
            $username = User::where('username', $request->username)->value('username');
            // dd($username);
            if ($username) {
                $pass = User::where('username', $request->username)->value('password');
                if ($pass == $request->password) {
                    return redirect()->route('dashboard');
                } else {
                    return back()->with('error', 'Wrong password. Please try again.');
                }
            } else {
                return back()->with('error', 'Username not found.');
            }
        }

        return view('login');
    }

    //dashboard

    public function dashboard(Request $request)
    {
        if ($request->isMethod('post')) {
            try {
                $user = User::all();
                return  response()->json($user);
            } catch (exception $e) {
                return  response()->json([
                    'message' => 'Something went wrong. Please try again later.'
                ], 500);
            }
        }

        return view('dashbord');
    }

    //update
    public function update(Request $request)
    {
        // $validated = $request->validate([
        //     'first_name' => 'required|string|max:50',
        //     'last_name'  => 'required|string|max:50',
        //     'username'   => 'required|string|min:4|unique:users',
        //     'email'      => 'required|email|unique:users,email',
        //     'password'   => 'required|string|min:5',
        //     'gender'     => 'required|in:male,female',
        //     'dob'        => 'date|before:' . now()->subYears(20),
        //     'phone' => 'required|phone:IN',
        // ]);
        try {

            $user = User::findOrFail($request->id);
            $address = Address::where('user_id', $request->id)->first();
            $user->update($request->all());
            $address->update($request->all());
            return response()->json([
                'message' => 'updated successfully'
            ]);
        } catch (exception $e) {
            return  response()->json([
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
        // return redirect()->route('dashboard');
    }

    //delete
    public function delete(Request $request)
    {
        User::destroy($request->id);
        return redirect()->route('dashboard');
    }


    public function old(Request $request)


    {
        try {
            $data = User::find($request->id);
            $userAddress = Address::where('user_id', $request->id)->first();
            // dd($userAddress->user_id);
            return response()->json([
                'user' => $data,
                'current_address' => $userAddress
            ]);
        } catch (exception $e) {
            return  response()->json([
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }


    public function show_update(Request $request)
    {
        return view('update')->with('id', $request->id);
    }

    public function address(Request $request)
    {

        if ($request->isMethod('get')) {
            return view('address')->with('id', $request->id);
        }



        $validated = $request->validate([
            'address1'     => 'required|string|max:100',
            'address2'     => 'nullable|string|max:100',
            'city'         => 'required|string|max:50',
            'state'        => 'required|string|max:50',
            'zipcode'      => 'required|string|max:10',
            'country'      => 'required|string|max:50',
            'address_type' => 'required|in:current,permanent',
        ]);


        $address = Address::create([
            'address1'     => $validated['address1'],
            'address2'     => $validated['address2'],
            'city'         => $validated['city'],
            'state'        => $validated['state'],
            'zipcode'      => $validated['zipcode'],
            'country'      => $validated['country'],
            'userid'      => $request->userid,
            'address_type' => $validated['address_type'],
            'ischecked'  => $request->ischecked
        ]);


        return response()->json([
            'success' => true,
            'message' => 'Address saved successfully!',
            'data'    => $address
        ]);
    }

    public function store(Request $request)
    {
        // Convert IDs to names for current address
        $countryName = null;
        $stateName = null;
        $cityName = null;
        
        if ($request->country) {
            $country = Country::find($request->country);
            $countryName = $country ? $country->name : null;
        }
        
        if ($request->state) {
            $state = State::find($request->state);
            $stateName = $state ? $state->name : null;
        }
        
        if ($request->city) {
            $city = City::find($request->city);
            $cityName = $city ? $city->name : null;
        }
        
        // Convert IDs to names for permanent address
        $pcountryName = null;
        $pstateName = null;
        $pcityName = null;
        
        if ($request->pcountry) {
            $pcountry = Country::find($request->pcountry);
            $pcountryName = $pcountry ? $pcountry->name : null;
        }
        
        if ($request->pstate) {
            $pstate = State::find($request->pstate);
            $pstateName = $pstate ? $pstate->name : null;
        }
        
        if ($request->pcity) {
            $pcity = City::find($request->pcity);
            $pcityName = $pcity ? $pcity->name : null;
        }

        $address = Address::create([
            'address1'     => $request->address1,
            'address2'     => $request->address2,
            'city'         => $cityName,
            'state'        => $stateName,
            'zipcode'      => $request->zipcode,
            'country'      => $countryName,
            'user_id'      => $request->userid,
            'ischecked'    => $request->ischecked,
            'paddress1'     => $request->paddress1,
            'paddress2'     => $request->paddress2,
            'pcity'         => $pcityName,
            'pstate'        => $pstateName,
            'pzipcode'      => $request->pzipcode,
            'pcountry'      => $pcountryName,


        ]);


        return response()->json([
            'success' => true,
            'message' => 'Address saved successfully!',
            'data'    => $address
        ]);
    }


    public function view(Request $request)
    {
        $user = User::find($request->id);
        $address = Address::where('user_id', $request->id)->first();

        return view('view')->with('data', [$user, $address]);
    }


    public function country()
    {
        $country = Country::all();
        return $country;
    }

    public function state(Request $request)
    {

        // dd($request->id);
        $country = State::where("country_id", $request->id)->get();
        return $country;
    }

    public function city(Request $request)
    {

        // dd($request->id);
        $country = City::where("state_id", $request->id)->get();
        return $country;
    }
}
