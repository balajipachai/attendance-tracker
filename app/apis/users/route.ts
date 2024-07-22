import { type NextRequest, NextResponse } from "next/server";
import {
  registerUser,
  authenticateUser,
  fetchAllUsers,
} from "@/app/lib/users/users.actions";

// Register User
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // When passing json payload then use `const data = await req.json();`
    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };
    let result;
    if (rawFormData.name) {
      result = await registerUser(formData);
    } else {
      result = await authenticateUser(formData);
    }
    return NextResponse.json({
      status: 200,
      message: rawFormData.name
        ? "User registration successful"
        : "Login successful",
      data: [result],
    });
  } catch (error: any) {
    console.error("Error in register user: ", error);
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: [],
    });
  }
}

/*
// For Updating Data
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData(); // When passing json payload then use `const data = await req.json();`
    const result = await authenticateUser(formData);
    return NextResponse.json({
      status: 200,
      message: "User registration successful",
      data: [result],
    });
  } catch (error: any) {
    console.error("Error in register user: ", error);
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: [],
    });
  }
}
*/

// For fetching all users
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get("role");
    const cursor = searchParams.get("cursor");
    const result = await fetchAllUsers(role!, cursor!);
    return NextResponse.json({
      status: 200,
      message: "Fetched all users successfully",
      data: [result],
    });
  } catch (error: any) {
    console.error("Error in fetching all users: ", error);
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: [],
    });
  }
}

/*
export async function PUT(req: NextRequest, res: NextApiResponse) {
    const { id, details } = await req.json();
    const result: CollectionDetails = await updateCollectionsDetails(id, details);
    return NextResponse.json({
      status: 200,
      message: 'Data updated successfully',
      data: [result]
    });
  }

  export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const instance = searchParams.get('instance');
    const chain = searchParams.get('chain');
    const owner = searchParams.get('owner') ?? '';
    const standard = searchParams.get('standard') ?? '';
    const pageNumber = searchParams.get('pageNumber') ?? '';
    const pageItems = searchParams.get('pageItems') ?? '';
    const sortBy = searchParams.get('sortBy') ?? '';
    const sortOrder = searchParams.get('sortOrder') ?? 'desc';
    const searchText = searchParams.get('query') ?? undefined;
  
    try {
      if (instance && chain) {
        const result = await getCollectionDetailByInstance(instance, chain);
        if (result) {
          return new Response(JSON.stringify({
            status: 200,
            message: 'Data fetched successfully',
            data: result
          }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else {
          return new Response(JSON.stringify({
            status: 404,
            error: 'No collection detail found with the provided ID'
          }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
      } else {
        const results = await getCollections(owner, standard!, Number(pageNumber), Number(pageItems), sortBy, sortOrder, searchText);
        return new Response(JSON.stringify({
          status: 200,
          message: 'Data fetched successfully',
          totalValues: results?.totalValues,
          data: results?.collections
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    } catch (error: any) {
      console.error(error);
      return new Response(JSON.stringify({
        status: 500,
        message: 'Internal Server Error',
        error: error.message
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  */
