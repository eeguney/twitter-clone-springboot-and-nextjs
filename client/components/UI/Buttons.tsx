import { IconList, Icons } from "./Icons";
import styles from "../../styles/Buttons.module.scss";

export enum ButtonList {
  Small,
  Image,
  Gif,
  Emoji,
  Pure
}

interface ButtonProps {
  button: ButtonList;
  color?: string;
  label?: string;
  background?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Buttons = (props: ButtonProps): JSX.Element => {
  switch (props.button) {
    case ButtonList.Image:
      return (
        <button type="button">
          <Icons
            icon={IconList.Image}
            size={18}
            {...props}
            color={props.color ?? ""}
          />
        </button>
      );
    case ButtonList.Gif:
      return (
        <button type="button">
          <Icons icon={IconList.Gif} size={18} {...props} color={props.color ?? ""} />
        </button>
      );
    case ButtonList.Emoji:
      return (
        <button type="button">
          <Icons
            icon={IconList.Emoji}
            size={18}
            {...props}
            color={props.color ?? ""}
          />
        </button>
      );
    case ButtonList.Small:
      return (
        <button type="button"  {...props} className={styles["btn-small"]}>
          {props.label ?? "Tweet"}
        </button>
      );
      case ButtonList.Pure:
      return (
        <button type="button"  {...props} className={styles["btn-pure"]}>
          {props.label ?? "Edit Profile"}
        </button>
      );
    default:
      return <></>;
  }
};
