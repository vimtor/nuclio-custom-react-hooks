# nuclio-custom-react-hooks
Source code of custom react hooks masterclass at [Nuclio Digital School](https://nuclio.school/?lang=en).

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

## Improvements

- [ ] Use axios' [instances](https://github.com/axios/axios#creating-an-instance) to clean up requests
- [ ] Do proper error checking on request
- [ ] Trust the request and rollback if they don't succeed
- [ ] Refactor to React [context](https://kentcdodds.com/blog/how-to-use-react-context-effectively/) with its custom `useTasks` hook. 

That way we can make our components more isolated. Going from this:

```jsx
export const Controls = ({ onLoad, tasks }) => (
    <>
        <button onClick={onLoad}>Load More</button>
        <footer>
            <strong>{tasks.filter((task) => !task.checked).length}</strong> tasks left.
        </footer>
    </>
);
```

To this:

```jsx
export const Controls = () => {
    const { tasks, loadMore } = useTasks();

    return (
        <>
            <button onClick={loadMore}>Load More</button>
            <footer>
                <strong>{tasks.filter((task) => !task.checked).length}</strong> tasks left.
            </footer>
        </>
    );
};
```

- [ ] Use some cool react data fetching library such as [react-query](https://github.com/tannerlinsley/react-query) or [swr](https://github.com/vercel/swr)
