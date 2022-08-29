import React, { useCallback, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  editSeries,
  validateSlug,
  getAllSeries,
} from "../redux/reducers/seriesReducer";
import _ from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Notification from "../Components/Notification";
import ImagesUploader from "../Components/ImagesUploader";
import SeriesForm from "../Components/SeriesForm";
import VideosCard from "../Components/VideosCard";
import SeriesMetadata from "../Components/SeriesMetadata";

export default function EditSeriesInfo() {
  const dispatch = useDispatch();

  const { selectedSeries, selectedSeriesVideos } = useSelector(
    (state) => state.series
  );
  const info = selectedSeries;
  const [logoImg, setLogoImg] = React.useState(null);
  const [thumbnailImg, setThumbnailImg] = React.useState(null);
  const [heroImg, setHeroImg] = React.useState(null);
  const [saveFlag, setSaveFlag] = React.useState(false);
  const [name, setName] = React.useState(info?.series_name);
  const [displayName, setDisplayName] = React.useState(
    info?.series_displayName
  );
  const [slug, setSlug] = React.useState(info?.series_name);
  const [description, setDescription] = React.useState(
    info?.series_description
  );
  const [slugFlag, setSlugFlag] = React.useState(false);
  const [nameFlag, setNamenameFlag] = React.useState(false);
  const [displayNameFlag, setDisplayNameFlag] = React.useState(false);
  const [descriptionFlag, setDescriptionFlag] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [slugCrossFlag, setSlugCrossFlag] = React.useState(false);
  const [logoUri, setLogoUri] = React.useState(info?.series_logo);
  const [thumbnailUri, setThumbnailUri] = React.useState(info?.series_imageUrl);
  const [heroUri, setHeroUri] = React.useState(info?.series_hero_image);
  const [messages, setMessages] = React.useState("");

  const { token } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (
      name.length > 0 &&
      displayName.length > 0 &&
      slug.length > 0 &&
      description.length > 0
    ) {
      setSaveFlag(true);
    } else {
      setSaveFlag(false);
    }
  }, [name, slug, description]);

  const handleNameInput = (val) => {
    if (val.length > 0) {
      setNamenameFlag(true);
      setName(val);
    } else {
      setNamenameFlag(false);
      setName(info.series_name);
    }
  };

  const requestSlugValidation = useCallback(() => {
    if (name.length > 0 && name != info.series_name) {
      const slugToValidate = name
        .replace(/[^\w\s]/gi, "")
        .replaceAll(" ", "-")
        .toLowerCase();

      dispatch(validateSlug({ token: token, slug: slugToValidate })).then(
        (res) => {
          if (res.payload.data.body.exist === false) {
            setSlug(slugToValidate);
            setSlugFlag(true);
            setSlugCrossFlag(false);
          } else {
            setSlug("");
            setSlugFlag(true);
            setSlugCrossFlag(true);
          }
        }
      );
    }
  }, [dispatch, name]);
  const validateNewSlug = useMemo(
    () => _.debounce(requestSlugValidation, 1000),
    [requestSlugValidation]
  );
  useEffect(() => {
    if (name && name.length > 0) {
      validateNewSlug();
    } else {
      setSlug(info.series_name);
      setSlugFlag(false);
    }
    return validateNewSlug.cancel;
  }, [dispatch, name, validateNewSlug]);

  const handleDescription = (val) => {
    if (val.length > 0) {
      setDescriptionFlag(true);
      setDescription(val);
    } else {
      setDescriptionFlag(false);
      setDescription(info.series_description);
    }
  };
  const saveNewSeries = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("series_slug", slug);
    formData.append("description", description);
    formData.append("logo", logoImg);
    formData.append("hero", heroImg);
    formData.append("image", thumbnailImg);
    formData.append("displayName", displayName);

    setIsloading(true);
    dispatch(
      editSeries({ token: token, data: formData, id: info.series_id })
    ).then((res) => {
      if (res.payload.data.body) {
        dispatch(getAllSeries({ token: token }));
        setIsloading(false);
      } else {
        setMessages(res.payload.data.message);
        setIsloading(false);
      }
    });
  };
  const handleDisplayName = (val) => {
    if (val.length > 0) {
      setDisplayNameFlag(true);
      setDisplayName(val);
    } else {
      setDisplayNameFlag(false);
      setDisplayName(info.displayName);
    }
  };

  const uploadLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLogoUri(result.uri);
      fetch(result.uri)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/png" });
          setLogoImg(file);
        });
    }
  };
  const uploadThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setThumbnailUri(result.uri);
      fetch(result.uri)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/png" });
          setThumbnailImg(file);
        });
    }
  };
  const uploadHero = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setHeroUri(result.uri);
      fetch(result.uri)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/png" });
          setHeroImg(file);
        });
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#fff" }}>
        <SafeAreaView>
          <View>
            {messages ? (
              <Notification
                key={messages}
                message={messages}
                onHide={() => {
                  messages = (messages) =>
                    messages.filter(
                      (currentMessage) => currentMessage !== messages
                    );
                }}
              />
            ) : null}
          </View>
        </SafeAreaView>

        <ImagesUploader
          uploadLogo={() => uploadLogo()}
          logoUri={logoUri}
          uploadThumbnail={() => uploadThumbnail()}
          thumbnailUri={thumbnailUri}
          uploadHero={() => uploadHero()}
          heroUri={heroUri}
        />
        <SeriesForm
          name={name}
          handleNameInput={(val) => handleNameInput(val)}
          nameFlag={nameFlag}
          slug={slug}
          slugFlag={slugFlag}
          slugCrossFlag={slugCrossFlag}
          displayName={displayName}
          handleDisplayName={(val) => handleDisplayName(val)}
          displayNameFlag={displayNameFlag}
          description={description}
          handleDescription={(val) => handleDescription(val)}
          descriptionFlag={descriptionFlag}
          isloading={isloading}
          saveFlag={saveFlag}
          saveNewSeries={() => saveNewSeries()}
        />
        <SeriesMetadata />

        <SafeAreaView>
          {selectedSeriesVideos ? (
            <VideosCard selectedSeriesVideos={selectedSeriesVideos} />
          ) : null}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
