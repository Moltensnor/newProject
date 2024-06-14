import Script from "next/script";

export default function testPage() {
  var onloadCallback = function () {
    grecaptcha.render("html_element", {
      sitekey: "6LdIPucpAAAAAI3BpXyt24kxPf5rWEAY9t27A5bu",
    });
  };

  return (
    <>
      <form action="?" method="POST">
        <div id="html_element"></div>
        <br />
        <div
          className="g-recaptcha"
          data-sitekey="6LdIPucpAAAAAI3BpXyt24kxPf5rWEAY9t27A5bu"
        ></div>
        <input type="submit" value="Submit" />
      </form>
      <script
        src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
        async
        defer
      ></script>
    </>
  );
}
