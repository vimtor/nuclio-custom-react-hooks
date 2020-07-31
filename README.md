# nuclio-custom-react-hooks
Source code of custom react hooks masterclass at [Nuclio Digital School](https://nuclio.school/?lang=en).

![preview](https://i.imgur.com/6QV9vJi.gif)

## Setup

```shell script
git clone https://github.com/papeloto/nuclio-custom-react-hooks.git
cd nuclio-custom-react-hooks
yarn install
yarn start
```

## Ideas

- Even thought hooks are functions they behave differently
- Hooks are subscriptions to events
- Hooks have [rules](https://reactjs.org/docs/hooks-rules.html) like starting by _use_ or not calling them conditionally
- We can define our custom hooks to encapsulate logic
- If your custom hook doesn't use the built-in hooks, it is probably a function, not a hook.
- We can use libraries like [axios](https://www.npmjs.com/package/axios) for making fetching easier

## Tasks

You will find the solutions of these tasks in different branches.

1. Add check feature with its according update request
2. Use axios' [instances](https://github.com/axios/axios#creating-an-instance) to clean up requests
3. Do proper error checking on request
4. Trust the request and rollback if they don't succeed
5. Refactor to React [context](https://kentcdodds.com/blog/how-to-use-react-context-effectively/) with its custom `useTasks` hook. 

That way we can make our components more isolated. Going from this:

```jsx
export const Controls = ({ onLoad, tasks }) => (
    <footer>
        <div>
            <strong>{tasks.filter((task) => !task.completed).length}</strong> tasks left.
        </div>
        <button onClick={onLoad}>Load More</button>
    </footer>
);
```

To this:

```jsx
export const Controls = () => {
    const { tasks, loadMore } = useTasks();

    return (
        <footer>
            <div>
                <strong>{tasks.filter((task) => !task.completed).length}</strong> tasks left.
            </div>
            <button onClick={loadMore}>Load More</button>
        </footer>
    );
};
```

6. Use some cool react data fetching library such as [react-query](https://github.com/tannerlinsley/react-query) or [swr](https://github.com/vercel/swr)
