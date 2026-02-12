const supabaseUrl = "https://srkrfncvofpjpnhxrhju.supabase.co";
const supabaseKey = "sb_publishable_lqV8MEW9zO_ILRc9T__SNg_Btqrbp7";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const courses = document.getElementById("courses").value;

    // Create Auth User (Supabase Auth)
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email: email,
        password: name,
        options: {
          data: {
            name: name,
            age: age,
            gender: gender,
            courses: courses
          }
        }
      });

    if (authError) {
      alert(authError.message);
      return;
    }

    // Insert Extra User Info into Database
    const { error: dbError } = await supabaseClient
      .from("users")
      .insert([
        {
          id: authData.user.id,
          name: name,
          email: email,
          age: age,
          gender: gender,
          courses: courses
        },
      ]);

    if (dbError) {
      alert(dbError.message);
    } else {
      alert("Registration successful!");
    }
  });
