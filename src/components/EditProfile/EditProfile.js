import React, { useState, useEffect } from "react";
import Input from "../../Styles/Input";
import {
  DataSection,
  DataText,
  PhotoSection,
  Box,
  ChangeSection,
  ChangeTitle,
  UploadBox,
  AuxiliarSection,
  AuxiliarView,
  AuxiliarText,
} from "./Styles";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function EditProfile(props) {
  const history = useHistory();
  const [newUsuario, setNewUsuario] = useState({});
  const [imageUrl, setImageUrl] = useState();

  function fillingUsuarioData(e) {
    const { value, name } = e.target;
    setNewUsuario({ ...newUsuario, [name]: value });
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  async function handleChange(info) {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
    });
  }

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  async function editUsuario() {
    window.location.reload();
  }

  return (
    <>
      <Box>
        <ChangeTitle>Time to Change</ChangeTitle>
        <ChangeSection>
          <DataSection>
            <Input
              name="nome"
              width="100%"
              placeholder={props.usuario.nome}
              onChange={fillingUsuarioData}
            />
            <Input
              name="email"
              width="100%"
              placeholder={props.usuario.email}
              onChange={fillingUsuarioData}
            />
            <Input
              name="data_nascimento"
              width="100%"
              placeholder={props.usuario.data_nascimento}
              onChange={fillingUsuarioData}
            />
          </DataSection>
          <PhotoSection>
            <UploadBox>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
                icon={<UploadOutlined />}
              >
                {props.usuario.foto ? (
                  <>
                    <img
                      src={props.usuario.foto}
                      className="foto"
                      alt="fotoPerfil"
                      height="100%"
                      width="100%"
                    ></img>
                  </>
                ) : (
                  <>{uploadButton}</>
                )}
              </Upload>
            </UploadBox>
            <AuxiliarSection>
              <AuxiliarView>
                <AuxiliarText
                  onClick={() => {
                    props.fecharEdit();
                  }}
                >
                  Cancelar
                </AuxiliarText>
              </AuxiliarView>
              <AuxiliarView>
                <AuxiliarText
                  onClick={() => {
                    editUsuario();
                  }}
                >
                  Confirmar
                </AuxiliarText>
              </AuxiliarView>
            </AuxiliarSection>
          </PhotoSection>
        </ChangeSection>
      </Box>
    </>
  );
}

export default EditProfile;
