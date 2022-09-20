import React from 'react'
import "./login.css";

const Login = () => {
  return (
    <body class="">
  <div class="container on">
    <div class="screen">
      <h3 class="title">
        CONNECTION ESTABLISHED
      </h3>
      <div class="box--outer">
        <div class="box">
          <div class="box--inner">
            <div class="content">
              <div class="holder">
                <b>NeonSploit v1.4</b> — 高度な脆弱性スキャンソフトウェア, security analysis  Please enter your
                neonsploit user credentials.
                <br />
                <br />
                <div class="row">
                  <div class="col col__left label">
                    Login
                  </div>
                  <div class="col col__center">
                    <input type="text" id="login" maxlength="32" />
                  </div>
                </div>
                <form method="post" action="/password">
                  <div class="row">
                    <div class="col col__left label">
                      Password
                    </div>
                    <div class="col col__center">
                      <input type="password" id="password" name="password" required="required" placeholder="" data-error="" maxlength="32" autocomplete="new-password"
                        autofocus="true" />
                    </div>
                  </div>
                {/*   <!-- <b class="flash">ACCESS DENIED</b> --> */}
                  <div class="row">
                    <button type="submit" id="submit" name="submit">[login]</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
  )
}

export default Login