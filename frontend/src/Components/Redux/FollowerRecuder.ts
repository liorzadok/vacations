// interface for followers
interface Followers {
  user_code: number;
  vacation_code: number;
}

// Initial state
export class FollowState {
  followers: Followers[] = [];
}

//what action i will use
export enum FollowActionType {
  addFollow = "addFollow",
  removeFollow = "removeFollow",
  allFollowers = "allFollowers",
  removeAllFollowers = "removeAllFollowers",
}

//action data structure
export interface FollowAction {
  type: FollowActionType;
  payload?: any;
}

// Functions to dispatch actions
export const allFollowersAction = (followers: Followers[]): FollowAction => {
  return { type: FollowActionType.allFollowers, payload: followers };
};

export const addFollowAction = (
  user_code: number,
  vacation_code: number
): FollowAction => {
  return {
    type: FollowActionType.addFollow,
    payload: { user_code, vacation_code },
  };
};

export const removeFollowAction = (
  user_code: number,
  vacation_code: number
): FollowAction => {
  return {
    type: FollowActionType.removeFollow,
    payload: { user_code, vacation_code },
  };
};

export const removeAllFollowsAction = (vacation_code: number): FollowAction => {
  return {
    type: FollowActionType.removeAllFollowers,
    payload: vacation_code,
  };
};

//this is the reducer function
export function FollowReducer(
  currentState: FollowState = new FollowState(),
  action: FollowAction
): FollowState {
  const newState = { ...currentState };
  switch (action.type) {
    case FollowActionType.allFollowers:
      newState.followers = action.payload;
      break;
    case FollowActionType.addFollow:
      // Add new follow to the array
      return {
        ...currentState,
        followers: [...currentState.followers, action.payload],
      };
    case FollowActionType.removeFollow:
      // Remove the specific follow from the array
      return {
        ...currentState,
        followers: currentState.followers.filter(
          (follow) =>
            follow.user_code !== action.payload.user_code ||
            follow.vacation_code !== action.payload.vacation_code
        ),
      };
    case FollowActionType.removeAllFollowers:
      return {
        ...currentState,
        followers: currentState.followers.filter(
          (follow) => follow.vacation_code !== action.payload
        ),
      };
  }
  return newState;
}