const supabaseUrl = "https://srkrfncvofpjpnhxrhju.supabase.co";
const supabaseKey = "sb_publishable_lqV8MEW9zO_ILRc9T__SNg_Btqrbp7";
const supabase= supabase.createclient(supabaseUrl,supabaseKey)
 document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    [[]]
    const file = document.getElementById("upload file").value;
    const courses = document.getElementById("courses").value;

    // 1️⃣ Create Auth User (Supabase Auth)
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        name: name,
        email: email,
        age: age,
        gender:gender,
        file:file,
        courses:courses

      });

    if (authError) {
      alert(authError.message);
      return;
    }

    // 2️⃣ Insert Extra User Info into Database
    const { error: dbError } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user.id, // link auth user
          name: name,
          email: email,
           age: age,
        gender:gender,
        file:file,
        courses:courses

        },
      ]);

    if (dbError) {
      alert(dbError.message);
    } else {
      alert("Registration successful 🎉");
    }
  });
