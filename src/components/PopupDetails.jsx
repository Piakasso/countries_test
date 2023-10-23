import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const PopupDetails = (props) => {
  const {
    isOpenModal,
    toggleModal,
    flag,
    name,
    population,
    capital,
    currencies,
    area,
    region,
    subregion,
    alt,
  } = props;

  const keys = Object.keys(currencies);

  const Field = ({ text, info, children }) => (
    <Typography component="span" sx={{ overflowWrap: "break-word" }}>
      {text}:
      <Typography component="span" variant="h6" sx={{ ml: 1 }}>
        {info}
      </Typography>
      {children}
    </Typography>
  );
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: 275,
            maxWidth: "80%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            <Grid sx={{ border: "2px black solid" }}>
              <img
                src={flag.png}
                alt={flag.alt}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Field text="country" info={name} />
            <Field text="population" info={population} />
            <Field text="capital" info={capital} />
            <Field text="currency" info={currencies[keys].name} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            <Field text="area" info={area}>
              &nbsp;sq.km
            </Field>
            <Field text="region" info={region} />
            <Field text="subregion" info={subregion} />
            <Field text="alternative" info={alt.map((item) => item)}></Field>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default PopupDetails;
