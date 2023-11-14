import React, { useContext, useState } from "react";
import { gptApiCall } from "../../services/gpt-services";
import { toast } from "react-toastify";
import StyleNewBtn from "../Shared/StyleNewBtn";
import LabelTooltip from "../Shared/LabelTooltip";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const EmailGenerator = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [isloading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    command: "Write an email based on the following information",
    from: "",
    to: "",
    date: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (!user) {
      toast.warning("Please login!");
      navigate("/login");
      return;
    }
    setLoading(true);
    setGeneratedEmail(null);
    e.preventDefault();

    const url = "method/whatagptapi.whatagpt.get";
    const temp = {
      user_content: formData,
      client_id: user?.uid,
      version: "2.0",
      chat_topic: "0",
    };

    gptApiCall(url, temp)
      .then((response) => {
        const res = response.data.message;

        if (res?.error_code === 1001 || res?.error_code === 1006) {
          toast.error(res.error_message);
          return;
        }

        const data = response.data.message.message;
        setLoading(false);
        setGeneratedEmail(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="main-container">
      <div className="w-full h-full overflow-hidden">
        <h6 className="template-section-title">Email Generator</h6>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-responseBox-common-styles">
            {formData?.map((field) => (
              <div key={field.fieldCaption} className="input-label-box-container">
                <label htmlFor={field?.fieldCaption} className="input-label">
                  {field?.fieldCaption.charAt(0).toUpperCase() + field.fieldCaption.slice(1)}{" "}
                  {field?.isMandatory && <span className="required">*</span>}
                  <LabelTooltip info={`Enter ${field.fieldCaption}`} />
                </label>
                {field.fieldType === "text" ? (
                  <>
                    <span className="input-word-count">{formData[field.fieldCaption].length}/{field.max}</span>
                    <input
                      type="text"
                      name={field.fieldCaption}
                      value={formData[field.fieldCaption]}
                      onChange={handleChange}
                      maxLength={field.max}
                      placeholder={`Enter ${field.fieldCaption}`}
                      className="input-box"
                    />
                  </>
                ) : field.fieldType === "date" ? (
                  <input
                    type="date"
                    name={field?.fieldCaption}
                    value={formData[field?.fieldCaption]}
                    onChange={handleChange}
                    className="input-box"
                  />
                ) : null}
              </div>
            ))}
            <button type="submit">
              <StyleNewBtn text={"Generate Email"} />
            </button>
          </form>
        </div>
      </div>
      <div className="w-full h-full">
        <h6 className="template-section-title">Generated Email</h6>
        <div className="form-container">
          {isloading && (
            <div className="load-container">
              <CircularProgress />
            </div>
          )}
          {generatedEmail && (
            <div className="form-responseBox-common-styles">{generatedEmail}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
