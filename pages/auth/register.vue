<template>
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <div class="card mt-4">
        <div class="card-header">
          <p class="mb-0">Register</p>
        </div>
        <div class="card-body">
          <form @submit.prevent="register">
            <!-- 標準のsubmitは実行しない -->
            <div class="form-group">
              <label>Name</label>
              <input
                v-model="form.name"
                type="test"
                :class="{ 'is-invalid': errors.name }"
                placeholder="Name"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name[0] }}
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                v-model="form.email"
                type="email"
                :class="{ 'is-invalid': errors.email }"
                placeholder="Email"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email[0] }}
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                v-model="form.password"
                type="password"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Password"
              />
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password[0] }}
              </div>
            </div>
            <div class="form-group">
              <input
                type="submit"
                value="Register"
                class="btn btn-default w-100"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: 'guest', //ログイン状態であればリダイレクトする
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      errors: {},
    }
  },
  methods: {
    async register() {
      this.form.password_confirmation = this.form.password
      await this.$axios
        .$post('/api/auth/register', this.form)
        .then((data) => {
          this.$auth.login({ data: this.form })
          this.$router.push({ name: 'index' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
